# Node/Express/Mongoose App — Assignment Checklist
**Due: Sunday night** | Total weight shown per item = 100%

> Every requirement below is adapted for **Mongoose** (the original assignment sheet said "MongoDB" in a few spots — ignore that wording, use Mongoose models/methods instead).

---

## 🎯 Priority Order (work top to bottom)

Do the items in **Tier 1** first. Don't touch Tier 3–4 until Tiers 1–2 are done and committed.

| Tier | Focus | Why first |
|---|---|---|
| **1. Foundation** | Project setup, git init, schemas/models, seed data | Nothing else works without this |
| **2. Core CRUD** | GET, POST, PATCH/PUT, DELETE routes | This is 40% of your grade — the bulk of the work |
| **3. Data Quality** | Indexes, validation, error-free run | Makes your app "correct," not just "functional" |
| **4. Polish** | Organization, README, commits, creativity | Fast to do once the app works — don't skip, it's free points |

---

## ✅ Tier 1 — Foundation

### ☐ Set up project + git (supports "commit frequently" — 5%)
- `npm init -y`, install `express`, `mongoose`, `dotenv`
- `git init` immediately — before you write real code
- **Commit after every meaningful chunk** (after schema, after each route file, after seed data, etc.), not just once at the end

### ☐ Use at least 3 data collections — 5%
- In Mongoose terms: **3+ separate models**, each with its own schema (e.g. `User`, `Post`, `Comment`)
- *Example:*
  ```js
  const userSchema = new mongoose.Schema({ name: String, email: String });
  const User = mongoose.model("User", userSchema);
  ```
- *Explanation:* Each `mongoose.model()` call maps to one MongoDB collection under the hood — you just never write raw collection names yourself.

### ☐ Reasonable data modeling — 10%
- Decide what belongs together vs. what should reference another collection
- *Example:* A `Comment` should reference a `Post` via an ObjectId, not duplicate the whole post inside it:
  ```js
  const commentSchema = new mongoose.Schema({
    text: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  });
  ```
- *Explanation:* This is Mongoose's version of a foreign key. `ref` lets you `.populate()` related data later instead of duplicating it everywhere.

### ☐ Populate with sample data — 5%
- **At least 5 documents per collection** (aim for 10–20 per collection — the sheet's own note warns that testing your DELETE route can drop you below 5 if you cut it close)
- *Example:* a `seed.js` file that connects, clears old data, and calls `Model.insertMany([...])` for each collection
- *Explanation:* Write this as a standalone script (`node seed.js`), separate from your server, so you can re-run it anytime your delete testing wipes data out.

---

## ✅ Tier 2 — Core CRUD Routes (40% of grade)

### ☐ GET routes — 10%
- One route to get **all** documents in a collection, and ideally one to get a **single** document by ID
- *Example:*
  ```js
  router.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  });
  router.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
  });
  ```
- *Explanation:* `.find()` = "SELECT all," `.findById()` = "SELECT where id =." Add query params (e.g. `.find({ author: req.query.author })`) if you want to go beyond minimum.

### ☐ POST routes — 10%
- At least one collection must allow **client creation** via POST
- *Example:*
  ```js
  router.post("/posts", async (req, res) => {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  });
  ```
- *Explanation:* `Model.create()` builds a new document from `req.body` and saves it in one step. This is where your validation rules (Tier 3) will actually kick in.

### ☐ PATCH or PUT routes — 10%
- At least one collection must allow **client update**
- *Example:*
  ```js
  router.patch("/posts/:id", async (req, res) => {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  });
  ```
- *Explanation:* `runValidators: true` is easy to forget — without it, Mongoose skips your schema validation on updates. `new: true` returns the *updated* doc instead of the old one.

### ☐ DELETE routes — 10%
- At least one collection must allow **client deletion**
- *Example:*
  ```js
  router.delete("/posts/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  });
  ```
- *Explanation:* Test this carefully — re-run your seed script after testing so you don't fall below the 5-document minimum.

---

## ✅ Tier 3 — Data Quality

### ☐ Sensible indexes — 5%
- Add indexes on fields you'll query/filter/sort by often (e.g. `email`, `username`, a foreign-key-style `ref` field)
- Skip indexing fields that get written constantly but rarely queried — leave a code comment explaining why
- *Example:*
  ```js
  userSchema.index({ email: 1 });
  ```
  ```js
  // No index on `viewCount` — it updates on every page load,
  // and we don't currently query/sort by it.
  ```
- *Explanation:* `1` = ascending index. Indexes speed up reads but slow down writes, so only index what you actually query on.

### ☐ Validation rules — 5%
- At least one schema needs real validation (`required`, `min`/`max`, `enum`, `match`, custom validator, etc.)
- **Must include a way to test it** — easiest option: a POST route that tries to create an invalid doc and shows the resulting error
- *Example:*
  ```js
  const postSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    status: { type: String, enum: ["draft", "published"], default: "draft" }
  });
  ```
  ```js
  // Test route — try posting { "title": "hi" } without a title, or an invalid status
  router.post("/posts", async (req, res) => {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  ```
- *Explanation:* This `try/catch` doubles as your validation test AND satisfies the "runs without errors" requirement below — errors get caught and returned as JSON instead of crashing the server.

### ☐ App runs with no errors — 10%
- Wrap risky routes in `try/catch`, comment out anything broken/unfinished, and briefly note in your README what's blocked and why
- *Explanation:* Partial credit is explicitly offered here — an honest comment ("route not finished, ran out of time") is worth more than a crash.

---

## ✅ Tier 4 — Polish & Documentation

### ☐ Reasonable code organization — 5%
- Split into folders: `/models`, `/routes` (or `/controllers`), `server.js`/`app.js`, `seed.js`
- *Explanation:* Graders are looking for separation of concerns, not a single 400-line file.

### ☐ Commit frequently — 5%
- Small, descriptive commits as you go (e.g. "add User schema," "add POST /posts route," "add validation + test route")

### ☐ README file — 5%
- Description of the app's purpose
- **List of all routes** with their CRUD operation, e.g.:

  | Method | Route | Description |
  |---|---|---|
  | GET | `/posts` | Get all posts |
  | GET | `/posts/:id` | Get one post |
  | POST | `/posts` | Create a post |
  | PATCH | `/posts/:id` | Update a post |
  | DELETE | `/posts/:id` | Delete a post |

### ☐ Level of effort / creativity — 5%
- Pick a topic you actually care about — extra routes, query filters, or a small frontend all count in your favor

---


---

### Quick Mongoose cheat-sheet
| Action | Method |
|---|---|
| Get all | `Model.find()` |
| Get one | `Model.findById(id)` |
| Create | `Model.create(data)` |
| Update | `Model.findByIdAndUpdate(id, data, { new: true, runValidators: true })` |
| Delete | `Model.findByIdAndDelete(id)` |
