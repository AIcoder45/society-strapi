# Strapi Image API Troubleshooting Guide

## Problem: Images not returning in API response

### Step 1: Check Media Permissions (CRITICAL)

**This is the most common issue!**

1. Go to Strapi Admin Panel: `http://localhost:1337/admin`
2. Navigate to: **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Scroll down and find **Upload** section
4. **Enable `find` permission** for Upload/Media
5. Click **Save**

Without this permission, media fields will return `null` even if populated.

---

### Step 2: Verify Event Permissions

Make sure Events API permissions are enabled:

1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Under **Event** section, enable:
   - ✅ `find` (to get all events)
   - ✅ `findOne` (to get single event)
3. Click **Save**

---

### Step 3: Use Correct API Query with Populate

**❌ Wrong - Images won't populate:**
```
GET /api/events
```

**✅ Correct - Populate all fields:**
```
GET /api/events?populate=*
```

**✅ Better - Populate specific media fields:**
```
GET /api/events?populate[coverImage][populate]=*&populate[gallery][populate]=*
```

**✅ Best - Full populate with all formats:**
```
GET /api/events?populate[coverImage][populate][formats]=*&populate[gallery][populate][formats]=*
```

---

### Step 4: Test API Response

**Test in Browser:**
```
http://localhost:1337/api/events?populate=*
```

**Expected Response Structure:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Your Event",
        "coverImage": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "image.jpg",
              "url": "/uploads/image_abc123.jpg",
              "formats": {
                "thumbnail": { "url": "/uploads/thumbnail_image_abc123.jpg" },
                "small": { "url": "/uploads/small_image_abc123.jpg" },
                "medium": { "url": "/uploads/medium_image_abc123.jpg" },
                "large": { "url": "/uploads/large_image_abc123.jpg" }
              },
              "width": 1920,
              "height": 1080
            }
          }
        },
        "gallery": {
          "data": [
            {
              "id": 2,
              "attributes": {
                "url": "/uploads/gallery1_xyz789.jpg",
                ...
              }
            }
          ]
        }
      }
    }
  ]
}
```

**If coverImage is null:**
```json
{
  "coverImage": {
    "data": null
  }
}
```

---

### Step 5: Verify Event Has Images Attached

1. Go to **Content Manager** → **Event**
2. Open your event
3. Check if **Cover Image** field has an image selected
4. Check if **Gallery** field has images selected
5. Make sure the event is **Published** (not just saved as draft)

---

### Step 6: Check Image Format

Strapi requires the populate parameter to get image formats. Use one of these:

**Option A - Populate everything:**
```
?populate=*
```

**Option B - Populate specific fields:**
```
?populate[coverImage][populate]=*&populate[gallery][populate]=*
```

**Option C - Populate with formats:**
```
?populate[coverImage][populate][formats]=*&populate[gallery][populate][formats]=*
```

---

### Step 7: Complete Example URLs

**Get all events with images:**
```
http://localhost:1337/api/events?populate[coverImage][populate]=*&populate[gallery][populate]=*&sort[0]=eventDate:asc
```

**Get single event by ID with images:**
```
http://localhost:1337/api/events/1?populate[coverImage][populate]=*&populate[gallery][populate]=*
```

**Get event by slug with images:**
```
http://localhost:1337/api/events?filters[slug][$eq]=your-event-slug&populate[coverImage][populate]=*&populate[gallery][populate]=*
```

---

## Quick Checklist

- [ ] Media `find` permission enabled for Public role
- [ ] Event `find` and `findOne` permissions enabled
- [ ] Event is **Published** (not draft)
- [ ] Images are actually attached to the event
- [ ] Using `populate=*` or specific populate parameters
- [ ] Testing URL in browser directly
- [ ] Strapi server is running (`npm run develop`)

---

## Common Issues & Solutions

### Issue: `coverImage: { data: null }`
**Solution:** 
- Check media permissions (Step 1)
- Verify image is attached in Content Manager
- Use `?populate=*` in query

### Issue: `coverImage` field missing entirely
**Solution:**
- Use populate parameter: `?populate[coverImage]=*`

### Issue: Images return but URLs are broken
**Solution:**
- URLs are relative, prepend your Strapi base URL
- Example: `http://localhost:1337${imageUrl}`

### Issue: Only original image, no formats
**Solution:**
- Use: `?populate[coverImage][populate][formats]=*`

---

## Next.js Integration Example

```typescript
// lib/strapi.ts
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export async function fetchEvents() {
  const url = `${STRAPI_URL}/api/events?populate[coverImage][populate]=*&populate[gallery][populate]=*`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data;
}

// Helper to get image URL
export function getImageUrl(media: unknown): string | null {
  if (!media) return null;
  
  const mediaData = (media as { data?: { attributes?: { url?: string } } })?.data?.attributes;
  if (!mediaData?.url) return null;
  
  const url = mediaData.url;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}
```



