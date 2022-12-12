const router = require("express").Router();
const auth = require("../../middleware/auth");
const offre = require("../../models/Offre");
const upload = require("../../middleware/multer");


// @route   GET api/cours
// @desc    Get all courses
// @access  Public
router.get("/", (req, res) => {
  Offre.find().sort('date').then((offre) => res.json({ msg: "Added Offre", offre: offre}));
});

router.get("/:id" , (req, res) => {
  offre.findById(req.params.id).then((offre) => res.json(offre));
});

// @route   POST api/cours
// @desc    Add new course
// @access  Private
router.post("/", upload.single('productImage'), (req, res) => {
  const { title, price, date } = req.body;
  let image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  let newOffre = new Offre({title , price , date , image});

console.log("new offre : "+newOffre)
  if(!newOffre.title || !newOffre.price ) res.status(400).send({msg:"Please add all field"})
  newOffre.save()
    .then((savedOffre) => res.json({ "msg": "Added Offre", "Offre": savedOffre}))
    .catch((err)=>{res.status(400).json({"msg" : err}); })
});

// @route   PUT api/cours
// @desc    Update a course
// @access  Private
router.put("/:id", upload.single('productImage'), (req, res) => {
  // let image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  let id = req.params.id;
  const { title, price, date } = req.body;
  let data ={title , price , date };
  // console.log(data)
   Offre.findOneAndUpdate({ _id: id }, data).then((offre) => res.json(offre));

 
});

// @route   DELETE api/cours/:id
// @desc    Delete a course by ID
// @access  Private
router.delete("/:id", (req, res) => {
  offre.findById(req.params.id)
    .then((offre) => offre.remove().then(() => res.json({ deleteSuccess: true })))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

// @route   DELETE api/cours/user/:id
// @desc    Delete a course by ID
// @access  Private
router.delete("/user/:id", auth, (req, res) => {
  offre.deleteMany({id_author : req.params.id})
    .then(() => res.json({ deleteSuccess: true }))
    .catch((err) => res.status(404).json({ deleteSuccess: false }));
});

module.exports = router;
