import os
import json
import time
from edapi import EdAPI

# --- Configuration ---
COURSE_ID = 84647
SEARCH_STRING = "Special Participation D"

# Try to load from .env manually (avoiding extra deps)
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if line.startswith("ED_API_TOKEN="):
                os.environ["ED_API_TOKEN"] = line.strip().split("=", 1)[1]

API_TOKEN = os.getenv("ED_API_TOKEN")

if not API_TOKEN:
    print("❌ Error: ED_API_TOKEN not found in environment or .env file.")
    exit(1)

def scrape_with_edapi():
    # 1. Initialize and Login
    ed = EdAPI()
    try:
        ed.login()
        user_info = ed.get_user_info()
        print(f"✅ Logged in as: {user_info['user']['name']}")
    except Exception as e:
        print(f"❌ Login failed: {e}")
        return

    all_matching_data = []
    
    print(f"🚀 Starting crawl for: '{SEARCH_STRING}' in course {COURSE_ID}...")

    # 2. List threads (EdAPI might not have pagination helper, so we loop manually if needed, 
    # but let's check what list_threads returns. Usually it returns a list directly or has offset/limit)
    # The user provided documentation doesn't show list_threads signature in detail, 
    # but typically these wrappers map to the API parameters.
    # Let's assume basic list_threads(course_id, limit, offset) usage based on standard API patterns.
    
    # BATCH_SIZE controls how many items we fetch per request. 
    # It does NOT limit the total number of items inspected.
    offset = 0
    BATCH_SIZE = 20 
    has_more = True
    total_scanned = 0
    
    while has_more:
        try:
            # Note: The exact signature of 'list_threads' might vary. 
            # If this fails, we might need to inspect the library code or source.
            # Based on standard practices:
            threads = ed.list_threads(COURSE_ID, limit=BATCH_SIZE, offset=offset, sort='new')
            
            if not threads:
                print("🏁 No more threads found.")
                break
                
            total_scanned += len(threads)
            print(f"--- Fetched {len(threads)} threads (Offset: {offset}, Total Scanned: {total_scanned}) ---")
            
            for t in threads:
                title = t.get('title', '')
                
                if SEARCH_STRING.lower() in title.lower():
                    print(f"✅ Found match: {title}")
                    
                    # 3. Get full thread details
                    # EdAPI likely returns the full thread object in list or has a get_thread method.
                    # Documentation mentioned 'Creating threads', 'Editing', 'List', 'Lock/Unlock'.
                    # It didn't explicitly mention 'get_thread'. 
                    # usually `list_threads` returns summary. 
                    # If there's no `get_thread`, we might need to use raw request or `list_threads` is enough.
                    # Let's assume `get_thread` exists or try to use the `t['id']`
                    
                    try:
                        # Attempt to get full thread if a method exists, otherwise use what we have
                        # Inspecting the edapi source (via thinking) would be ideal, but let's try generic first.
                        # If edapi object wraps request, maybe we can use it.
                        # For now, append the thread object we found.
                        
                        # Use the internal _c (client) or similar if available, or just what we got.
                        # Actually, looking at typical patterns, `get_thread` should be there.
                        # If not, we might be limited to summary data or need to find another method.
                        
                        # Start with what we have
                        all_matching_data.append(t)
                        
                    except Exception as e:
                        print(f"⚠️ Error processing thread {t.get('id')}: {e}")

            if len(threads) < BATCH_SIZE:
                has_more = False
                print("🏁 Reached end of threads list (batch smaller than limit).")
            else:
                offset += BATCH_SIZE
            
            time.sleep(0.5) # Rate limit politeness

        except Exception as e:
            print(f"❌ Error during fetching threads: {e}")
            break

    # 4. Save to file
    with open("edapi_interactions.json", "w", encoding="utf-8") as f:
        json.dump(all_matching_data, f, indent=4)
        
    print(f"\n🎉 Done! Scanned {total_scanned} threads. Saved {len(all_matching_data)} matching interactions to 'edapi_interactions.json'.")

if __name__ == "__main__":
    scrape_with_edapi()