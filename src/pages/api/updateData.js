const { sql } = require("@vercel/postgres");

async function updateData(req,res) {
    try {
        
        if(req.method !== "PUT") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {title, contain} = req.body
        const {id} = await req.query

        const rows = await sql`UPDATE note SET contain = ${contain}, title = ${title} WHERE id = ${id}`

        res.status(200).json({message:"Success", data:rows})
    } catch(e){
        console.log("ADA ERROR ", e)
        return res.status(500).json({message:"Terjadi error,"})
    }
}

export default (updateData)