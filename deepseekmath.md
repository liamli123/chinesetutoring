# DeepSeek Math Tutor Website - Complete Technical Documentation

## Project Overview

A dual-chatbox math tutoring website with file upload capabilities, deployed on Vercel. Users can choose between V3.2 Regular (fast, good accuracy) and V3.2-Speciale (slower, best accuracy) for solving math problems.

---

## Architecture Overview

### Tech Stack
- **Frontend:** Next.js 14 (React framework optimized for Vercel)
- **Backend:** Next.js API Routes (serverless functions)
- **Deployment:** Vercel
- **AI Provider:** DeepSeek API (2 endpoints)
- **Styling:** Tailwind CSS
- **File Handling:** Base64 encoding for images, PDF text extraction

### Why Next.js + Vercel?
- Vercel is optimized for Next.js (zero-config deployment)
- API routes become serverless functions automatically
- Built-in file upload handling
- Edge functions for global low latency
- Free tier is generous (100GB bandwidth, 100 serverless function executions)

---

## File Structure

```
deepseek-math-tutor/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json (optional, if using TypeScript)
├── .env.local
├── .gitignore
├── README.md
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ChatBox.tsx
│   ├── FileUpload.tsx
│   ├── MessageBubble.tsx
│   └── LoadingSpinner.tsx
│
├── app/api/
│   ├── solve-regular/
│   │   └── route.ts
│   └── solve-speciale/
│       └── route.ts
│
└── lib/
    ├── deepseek.ts
    └── utils.ts
```

---

## Environment Variables

Create `.env.local` in root directory:

```env
DEEPSEEK_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For Vercel deployment, add these in Vercel dashboard under Settings → Environment Variables.

**Important:** Never commit `.env.local` to git! Add it to `.gitignore`.

---

## API Configuration

### Two Separate API Endpoints Required

**Endpoint 1: V3.2 Regular**
```
Base URL: https://api.deepseek.com
Models available: 
  - deepseek-chat (non-thinking mode)
  - deepseek-reasoner (thinking mode)
Features: File upload, tool calling, JSON mode
```

**Endpoint 2: V3.2-Speciale**
```
Base URL: https://api.deepseek.com/v3.2_speciale_expires_on_20251215
Model: deepseek-chat (same name, different endpoint)
Features: Pure reasoning only (no tools, no file upload)
Expiration: December 15, 2025, 15:59 UTC
```

### API Client Setup

Both use OpenAI SDK (DeepSeek is OpenAI-compatible):

```typescript
// lib/deepseek.ts structure

import OpenAI from 'openai';

// Client 1: Regular
const regularClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

// Client 2: Speciale
const specialeClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v3.2_speciale_expires_on_20251215'
});
```

---

## Feature Requirements

### 1. Dual Chatbox Interface

**Layout:**
```
+--------------------------------------------------+
|              DeepSeek Math Tutor                 |
+------------------------+-------------------------+
|                        |                         |
|   V3.2 Regular Chat    |   V3.2-Speciale Chat   |
|                        |                         |
|  [File Upload]         |  [Text Only]            |
|  [Text Input]          |  [Text Input]           |
|  [Send Button]         |  [Send Button]          |
|                        |                         |
|  Messages...           |  Messages...            |
|                        |                         |
+------------------------+-------------------------+
```

**Chatbox Features:**

**Left Chatbox (V3.2 Regular):**
- ✅ File upload button (images: JPG, PNG, GIF / PDFs)
- ✅ Text input
- ✅ Drag & drop zone
- ✅ Checkbox: "Use thinking mode" (switches between deepseek-chat and deepseek-reasoner)
- ✅ Message history with avatars
- ✅ Copy solution button
- ✅ Show token usage and cost
- Badge: "⚡ Fast Mode - Good Accuracy (70-85%)"

**Right Chatbox (V3.2-Speciale):**
- ❌ No file upload (Speciale doesn't support it)
- ✅ Text input only
- ✅ Warning: "Text only - no file uploads supported"
- ✅ Message history with avatars
- ✅ Copy solution button
- ✅ Show token usage and cost
- Badge: "🏆 Best Accuracy (96%) - Slower"

### 2. File Upload Component

**Specifications:**
- Max file size: 10MB
- Accepted formats: 
  - Images: .jpg, .jpeg, .png, .gif, .webp
  - Documents: .pdf
- Preview image before sending
- Drag & drop functionality
- Clear/remove uploaded file button

**File Processing Flow:**
1. User uploads image/PDF
2. Frontend converts to base64 (for images) or extracts text (for PDFs)
3. Send to V3.2 Regular API only (Speciale cannot handle files)
4. API extracts problem text using vision capability
5. Solve and return

### 3. Message Bubble Component

**Structure:**
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string; // Only for thinking mode
  timestamp: Date;
  tokens?: number;
  cost?: number;
  model?: string;
}
```

**Display:**
- User messages: Right-aligned, blue background
- Assistant messages: Left-aligned, gray background
- Show "thinking..." indicator while processing
- Reasoning shown in collapsible section (if available)
- Final answer highlighted in green box if contains `\boxed{}`
- Timestamp below each message
- Token usage and cost shown below assistant messages

### 4. API Routes

**Route 1: `/api/solve-regular`**

Purpose: Handle V3.2 Regular requests

Accepted inputs:
- Text only
- Text + image (base64)
- Text + PDF text

Query parameters:
- `useThinking`: boolean (use deepseek-reasoner vs deepseek-chat)

Response format:
```typescript
{
  solution: string;
  reasoning?: string; // if useThinking = true
  tokens: number;
  cost: number;
  model: string; // "V3.2 Regular" or "V3.2 Thinking"
}
```

**Route 2: `/api/solve-speciale`**

Purpose: Handle V3.2-Speciale requests

Accepted inputs:
- Text only (no files!)

Response format:
```typescript
{
  solution: string;
  tokens: number;
  cost: number;
  model: string; // "V3.2-Speciale"
}
```

---

## API Implementation Details

### Image Upload Processing

**Step-by-step:**

1. User uploads image in left chatbox
2. Frontend converts image to base64:
   ```typescript
   const reader = new FileReader();
   reader.readAsDataURL(file);
   const base64 = result.split(',')[1];
   ```

3. Send to `/api/solve-regular`:
   ```typescript
   {
     text: "Solve this problem",
     image: base64String,
     imageType: "image/jpeg",
     useThinking: false
   }
   ```

4. Backend calls DeepSeek with vision:
   ```typescript
   const response = await regularClient.chat.completions.create({
     model: "deepseek-chat",
     messages: [{
       role: "user",
       content: [
         { type: "image_url", image_url: { url: `data:${imageType};base64,${image}` }},
         { type: "text", text: userText }
       ]
     }]
   });
   ```

### PDF Processing

1. Extract text from PDF on frontend using PDF.js library
2. Send extracted text to API (same as text input)
3. No special handling needed

### Text-Only Processing

**For V3.2 Regular:**
```typescript
// Non-thinking mode
const response = await regularClient.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: problemText }]
});

// Thinking mode
const response = await regularClient.chat.completions.create({
  model: "deepseek-reasoner",
  messages: [{ role: "user", content: problemText }]
});
// Access reasoning: response.choices[0].message.reasoning_content
```

**For V3.2-Speciale:**
```typescript
const response = await specialeClient.chat.completions.create({
  model: "deepseek-chat", // Same model name, different endpoint!
  messages: [{ 
    role: "user", 
    content: `${problemText}\n\nPlease reason step by step, and put your final answer within \\boxed{}.`
  }],
  temperature: 0.6 // DeepSeek recommends 0.6 for R1/Speciale
});
```

---

## Cost Calculation

### Pricing (as of Dec 2024)

Both V3.2 Regular and V3.2-Speciale have **same per-token pricing**:
- Input: $0.14 per 1M tokens
- Output: $0.28 per 1M tokens

**Conversion to RMB:** Multiply USD by 7.3 (current exchange rate)

### Token Usage Estimates

| Scenario | Model | Tokens | Cost (USD) | Cost (RMB) |
|----------|-------|--------|------------|------------|
| Simple text problem | Regular | 2,000 | $0.0006 | ¥0.004 |
| Image upload + extraction | Regular | 5,000 | $0.0015 | ¥0.011 |
| Medium problem (thinking) | Regular | 8,000 | $0.0024 | ¥0.018 |
| Hard problem | Speciale | 25,000 | $0.0075 | ¥0.055 |
| Competition problem | Speciale | 40,000 | $0.012 | ¥0.088 |

**Calculate cost in code:**
```typescript
function calculateCost(usage: { prompt_tokens: number; completion_tokens: number }) {
  const inputCost = (usage.prompt_tokens / 1_000_000) * 0.14;
  const outputCost = (usage.completion_tokens / 1_000_000) * 0.28;
  const totalUSD = inputCost + outputCost;
  const totalRMB = totalUSD * 7.3;
  return { usd: totalUSD, rmb: totalRMB };
}
```

---

## UI/UX Specifications

### Color Scheme

**Primary Colors:**
- Brand Purple: `#667eea`
- Brand Purple Dark: `#764ba2`
- Success Green: `#4caf50`
- Warning Yellow: `#ffc107`
- Error Red: `#f44336`

**Neutral Colors:**
- Background: `#f8f9ff`
- White: `#ffffff`
- Light Gray: `#e0e0e0`
- Dark Gray: `#666666`
- Black: `#000000`

### Typography

- **Headings:** Inter or SF Pro (system font)
- **Body:** Inter or SF Pro
- **Code/Math:** JetBrains Mono or Monaco

### Responsive Design

**Breakpoints:**
- Mobile: < 768px (stack chatboxes vertically)
- Tablet: 768px - 1024px (side-by-side, narrower)
- Desktop: > 1024px (full side-by-side)

**Mobile Layout:**
```
+---------------------------+
|   V3.2 Regular Chat       |
|   [Full width]            |
+---------------------------+
|   V3.2-Speciale Chat      |
|   [Full width]            |
+---------------------------+
```

### Loading States

**While processing:**
- Show animated spinner
- Display message: "Thinking..." or "Processing image..."
- Disable send button
- Show progress indicator if possible

**Thinking mode specific:**
- Show "Reasoning through problem..." with animated dots
- Estimated time: "This may take 10-30 seconds"

### Error Handling

**Common errors to handle:**

1. **File too large**
   - Message: "File size exceeds 10MB. Please use a smaller image."
   - Action: Reject upload

2. **Invalid file type**
   - Message: "File type not supported. Please upload JPG, PNG, or PDF."
   - Action: Reject upload

3. **API error**
   - Message: "Unable to process request. Please try again."
   - Action: Show retry button

4. **File upload in Speciale chatbox** (prevent this!)
   - Message: "V3.2-Speciale only accepts text. Please use Regular chat for files."
   - Action: Disable file upload in right chatbox

5. **Speciale endpoint expired (after Dec 15, 2025)**
   - Message: "V3.2-Speciale is no longer available. Using V3.2 Thinking mode instead."
   - Action: Automatically fall back to regular endpoint with thinking mode

### Accessibility

- **Keyboard navigation:** Tab through all interactive elements
- **Screen readers:** Proper ARIA labels
- **Focus indicators:** Clear blue outline
- **Alt text:** All images have descriptive alt text
- **Contrast:** WCAG AA compliant (4.5:1 minimum)

---

## Vercel Deployment

### Prerequisites

1. Vercel account (free tier is sufficient)
2. GitHub repository with your code
3. DeepSeek API key

### Deployment Steps

1. **Connect GitHub to Vercel:**
   - Go to vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js

2. **Configure Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `DEEPSEEK_API_KEY` = your_actual_key
   - Add: `NEXT_PUBLIC_APP_URL` = your_vercel_url

3. **Deploy:**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Get URL: `your-project.vercel.app`

4. **Custom Domain (optional):**
   - Settings → Domains
   - Add your custom domain
   - Update DNS records

### Vercel Configuration

**next.config.js:**
```javascript
module.exports = {
  images: {
    domains: ['cdn.deepseek.com'], // If loading external images
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Allow 10MB file uploads
    }
  }
}
```

### Performance Optimization

1. **Enable Vercel Edge Functions:**
   - Move API routes to edge runtime for faster response
   - Add `export const runtime = 'edge'` to API routes

2. **Image Optimization:**
   - Use Next.js Image component
   - Vercel automatically optimizes images

3. **Caching:**
   - Cache API responses for common problems
   - Use `revalidate` for ISR (Incremental Static Regeneration)

---

## Security Considerations

### API Key Protection

**Critical:** Never expose API key to frontend!

✅ **Correct:**
```typescript
// API Route (server-side)
const apiKey = process.env.DEEPSEEK_API_KEY;
```

❌ **Wrong:**
```typescript
// Frontend component
const apiKey = "sk-xxxxx"; // NEVER DO THIS!
```

### Rate Limiting

Implement rate limiting to prevent abuse:

**Strategy:**
- Limit: 10 requests per minute per IP
- Use Vercel Edge Config or Redis
- Return 429 error if exceeded

### Input Validation

**Backend validation:**
- Check file size < 10MB
- Verify file type matches allowed list
- Sanitize text input (remove script tags, SQL injection attempts)
- Limit text input to 10,000 characters

### CORS Configuration

For Vercel API routes, CORS is automatically handled. If issues:

```typescript
// In API route
export async function POST(request: Request) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': '*', // Or specific domain
      'Content-Type': 'application/json',
    },
  });
}
```

---

## Testing Checklist

### Functional Testing

**V3.2 Regular Chatbox:**
- [ ] Send text-only problem → receives solution
- [ ] Upload JPG image → extracts and solves
- [ ] Upload PNG image → extracts and solves
- [ ] Upload PDF → extracts and solves
- [ ] Enable thinking mode → shows reasoning
- [ ] Disable thinking mode → faster response
- [ ] Drag and drop image → works
- [ ] Clear uploaded file → clears preview
- [ ] Send empty message → shows error
- [ ] File > 10MB → shows error
- [ ] Invalid file type → shows error

**V3.2-Speciale Chatbox:**
- [ ] Send text-only problem → receives solution
- [ ] Attempt file upload → disabled/error message
- [ ] Long complex problem → correct solution
- [ ] Shows higher token usage than Regular
- [ ] Cost calculation accurate

**Cross-chatbox:**
- [ ] Both chatboxes work independently
- [ ] Message history separate per chatbox
- [ ] No interference between chatboxes

### UI/UX Testing

- [ ] Responsive on mobile (< 768px)
- [ ] Responsive on tablet (768-1024px)
- [ ] Responsive on desktop (> 1024px)
- [ ] Dark mode support (optional)
- [ ] Loading spinner shows during processing
- [ ] Error messages display correctly
- [ ] Copy button works
- [ ] Scroll to latest message works
- [ ] LaTeX/math notation renders properly

### Performance Testing

- [ ] Image upload < 3 seconds
- [ ] Text solution < 5 seconds (Regular)
- [ ] Text solution < 30 seconds (Speciale)
- [ ] Multiple rapid requests handled
- [ ] Large PDF (5MB) processes correctly

### Security Testing

- [ ] API key not visible in frontend
- [ ] Rate limiting works
- [ ] Input sanitization prevents XSS
- [ ] File validation prevents malicious uploads

---

## Optional Enhancements

### Phase 1 (MVP - Required)
✅ Dual chatbox interface
✅ File upload (left chatbox only)
✅ Text input (both chatboxes)
✅ DeepSeek API integration
✅ Cost display
✅ Basic styling

### Phase 2 (Nice to Have)
- [ ] LaTeX rendering with MathJax/KaTeX
- [ ] Save conversation history to localStorage
- [ ] Export conversation as PDF
- [ ] Share solution via link
- [ ] Problem difficulty auto-detection
- [ ] Syntax highlighting for code

### Phase 3 (Advanced)
- [ ] User authentication (NextAuth.js)
- [ ] Save history to database (Supabase/MongoDB)
- [ ] Payment integration (Stripe)
- [ ] Usage analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Voice input for problems

---

## Fallback Strategy

### When V3.2-Speciale Expires (Dec 15, 2025)

**Option 1: Graceful degradation**
```typescript
try {
  // Try Speciale
  const response = await specialeClient.chat.completions.create(...);
} catch (error) {
  if (error.message.includes('expired')) {
    // Fall back to Regular thinking mode
    console.log('Speciale expired, using thinking mode');
    return solveWithThinking(problemText);
  }
  throw error;
}
```

**Option 2: Update UI**
- Remove right chatbox
- Add note: "V3.2-Speciale is no longer available. Using best available model."
- Upgrade Regular chatbox to use thinking mode by default

---

## Dependencies (package.json)

### Required Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "openai": "^4.24.1",
    "pdfjs-dist": "^3.11.174"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  }
}
```

### Optional Dependencies
```json
{
  "dependencies": {
    "katex": "^0.16.9", // LaTeX rendering
    "react-katex": "^3.0.1",
    "react-markdown": "^9.0.1", // Markdown rendering
    "react-syntax-highlighter": "^15.5.0" // Code highlighting
  }
}
```

---

## Git Strategy

### .gitignore
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Next.js
/.next/
/out/

# Production
/build

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel
```

### Commit Structure
```
feat: Add dual chatbox interface
feat: Implement file upload for V3.2 Regular
feat: Connect to DeepSeek API endpoints
fix: Resolve file size validation issue
docs: Update README with deployment steps
```

---

## Troubleshooting

### Common Issues

**Issue 1: API returns 401 Unauthorized**
- Solution: Check DEEPSEEK_API_KEY in .env.local
- Verify key is active on platform.deepseek.com

**Issue 2: File upload fails**
- Solution: Check file size < 10MB
- Ensure bodyParser.sizeLimit is set correctly in next.config.js

**Issue 3: Speciale endpoint returns error**
- Solution: Check URL is exactly `https://api.deepseek.com/v3.2_speciale_expires_on_20251215`
- Verify expiration date hasn't passed

**Issue 4: High latency on Vercel**
- Solution: Enable Edge Functions
- Use Vercel's caching headers

**Issue 5: Image not extracted correctly**
- Solution: Ensure base64 encoding is correct
- Check image quality (too blurry = poor extraction)

---

## Monitoring & Analytics

### What to Track

**Usage Metrics:**
- Total requests per day
- Requests per chatbox (Regular vs Speciale)
- Average tokens per request
- Average cost per request
- File uploads vs text-only

**Performance Metrics:**
- API response time
- Image processing time
- Error rate
- Success rate

**User Behavior:**
- Bounce rate
- Session duration
- Most common problem types

**Cost Metrics:**
- Daily API spend
- Per-user cost
- Most expensive queries

### Implementation

Use Vercel Analytics (built-in):
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Documentation for Future Maintenance

### Code Comments Standard

```typescript
/**
 * Processes math problem using V3.2-Speciale
 * @param problemText - The math problem as plain text
 * @returns Solution object with reasoning and cost
 * @throws Error if API call fails
 */
async function solveWithSpeciale(problemText: string) {
  // Implementation
}
```

### README.md Structure

```markdown
# DeepSeek Math Tutor

## Features
- Dual AI chatboxes (Regular vs Speciale)
- File upload support (images, PDFs)
- Real-time cost tracking

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Add API key to `.env.local`
4. Run: `npm run dev`

## Deployment
- Push to GitHub
- Import to Vercel
- Add environment variables
- Deploy

## API Keys
Get your key from: https://platform.deepseek.com

## Support
For issues, email: your-email@example.com
```

---

## Summary Checklist

Before handing to Claude Code, ensure you have:

- [x] DeepSeek API key from platform.deepseek.com
- [x] Vercel account created
- [x] GitHub repository ready
- [x] Clear understanding of dual-API architecture
- [x] File upload requirements documented
- [x] UI/UX specifications defined
- [x] Cost calculation logic understood
- [x] Error handling strategy planned
- [x] Deployment process outlined

---

## Final Notes

**Key Points to Emphasize to Claude Code:**

1. **Two separate OpenAI clients required** - same API key, different base URLs
2. **File upload ONLY in left chatbox** - Speciale cannot handle files
3. **V3.2-Speciale expires Dec 15, 2025** - implement fallback logic
4. **Use Next.js for Vercel optimization** - not vanilla React or Flask
5. **API key must stay server-side** - use Next.js API routes
6. **Token usage varies dramatically** - Regular: 2k-8k, Speciale: 20k-40k tokens
7. **Temperature 0.6 for Speciale** - as recommended by DeepSeek
8. **Include proper error messages** - guide users when something fails

**Success Criteria:**
- User can upload image to left chatbox → get solution
- User can type text in either chatbox → get solution
- Both chatboxes work independently
- Cost is displayed accurately
- Deploys to Vercel without issues
- Mobile responsive
- Handles errors gracefully

**Estimated Development Time:**
- Claude Code implementation: 30-60 minutes
- Testing and refinement: 30 minutes
- Vercel deployment: 10 minutes
- Total: ~2 hours

---

Good luck with implementation! This documentation should give Claude Code everything needed to build your dual-chatbox math tutor website.