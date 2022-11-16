const router = require("express").Router();
const auth = require("../../middleware/auth");

const Cour = require("../../models/Offre");

// @route   GET api/cours
// @desc    Get all courses
// @access  Public
router.get("/", (req, res) => {
  Offre.find().sort('date').then((offre) => res.json(offre));
});

// @route   POST api/cours
// @desc    Add new course
// @access  Private
router.post("/", auth, (req, res) => {
  let newOffre = new Offre(req.body);
  
console.log("new course : "+newOffre)
  if(!newOffre.title || !newOffre.price) res.status(400).send({msg:"Please add all field"})
  newOffre.save()
    .then((savedOffre) => res.json({ "msg": "Added Offre", "Offre": savedOffre}))
    .catch((err)=>{res.status(400).json({"msg" : err}); })
});

// @route   PUT api/cours
// @desc    Update a course
// @access  Private
router.put("/:id", auth, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log(data)
  Cour.findOneAndUpdate({ _id: id }, data).then((offre) => res.json(offre));
});

// @route   DELETE api/cours/:id
// @desc    Delete a course by ID
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Cour.findById(req.params.id)
    .then((offre) => offre.remove().then(() => res.json({ deleteSuccess: true })))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

// @route   DELETE api/cours/user/:id
// @desc    Delete a course by ID
// @access  Private
router.delete("/user/:id", auth, (req, res) => {
  Cour.deleteMany({id_author : req.params.id})
    .then(() => res.json({ deleteSuccess: true }))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

module.exports = router;
