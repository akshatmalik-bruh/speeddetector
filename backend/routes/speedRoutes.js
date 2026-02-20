const z = require("zod");
const router = require("express").Router();
const {Raftaar} = require("../database/schema") 

const speedSchema = z.object({
  speed: z.number(),
  stat: z.enum(["overspeeding", "not overspeeding"]),
  image: z.string().optional(),
});

router.post("/speed", async (req, res) => {
  try {
    const speedParse = speedSchema.safeParse(req.body);

    if (!speedParse.success) {
      return res.status(400).json({
        msg: "Incorrect input",
        errors: speedParse.error.errors,
      });
    }

    const { speed, stat, image } = speedParse.data;

    const newSpeed = await Raftaar.create({
      speed,
      stat,
      image,
    });

    return res.status(200).json({
      msg: "Speed recorded successfully",
      data: newSpeed,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
});
router.get("/allinfo",async (req,res)=>{
    try{
           const alldata = await Raftaar.find({}).sort({ createdAt: -1 });
           return res.status(200).json({
            data : alldata
           })
    }
    catch(err){
        return res.status(500).json({
            msg : "Server erro",
            error : err.message
        })
    }
 


})
router.get("/analytics", async (req, res) => {
  try {
   
    const totalVehicles = await Raftaar.countDocuments();

   
    const totalOverspeeding = await Raftaar.countDocuments({
      stat: "overspeeding"
    });
    const averageResult= await Raftaar.aggregate([
  {
    $group: {
      _id: null,
      
      avgSpeed: { $avg: "$speed" },
      
    }
  }
]);
   const averageSpeed = averageResult[0]?.avgSpeed || 0;
    
    const hourlyData = await Raftaar.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%H:00",
              date: "$createdAt"
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.status(200).json({
      totalVehicles,
      totalOverspeeding,
      hourlyData,
      averageSpeed
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
});


module.exports = router;