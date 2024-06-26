const { sql } = require("@vercel/postgres");

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "ID harus diisi" });
        }

        const { rows } = await sql`
            SELECT title, contain, created_at 
            FROM note 
            WHERE id = ${id}
        `;

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
