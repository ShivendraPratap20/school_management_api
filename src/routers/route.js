const Express = require("express");
const router = Express.Router();
const { schoolSchema } = require("../validationSchema/schoolSchema");
const { initDB } = require("../db/connection/conn");
const geoip = require("geoip-lite");

let db;

(async () => {
    db = await initDB();
})();

router.get("/listSchools", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM schools ORDER BY id ASC");

        if (rows.length === 0) {
            return res.status(404).json({ message: "No schools found" });
        }

        res.status(200).json({ status: 'SUCCESS',  data: rows });

    } catch (error) {
        console.log(`Error while fetching data ${error}`);
        res.status(505).json({
            status: 'FAILED',
            message: 'Inernal server error'
        });
    }
});

router.get("/listSchoolsSort", async (req, res) => {
    const ip = "207.97.227.239";
    const geo = geoip.lookup(ip);
    if (!geo) {
        return res.status(400).json({ status: 'FAILED', message: `Can't calculate the co-ordinate of user!` });
    }
    const { ll } = geo;
    console.log(`Client location from IP: ${ll}`);
    const [latitude, longitude] = ll;
    try {
        const [schools] = await db.query(
            `SELECT id, name, address, latitude, longitude,
        (6371 * acos(
          cos(radians(?)) 
          * cos(radians(latitude)) 
          * cos(radians(longitude) - radians(?)) 
          + sin(radians(?)) 
          * sin(radians(latitude))
        )) AS distance_km
       FROM schools
       ORDER BY distance_km ASC`,
            [latitude, longitude, latitude]
        );

        res.status(200).json({ status:"SUCCESS", data: schools });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status:"FAILED", message: "Internal server error" });
    }
});

router.get("/listSchools/:id", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(400).json({ status:'FAILED', message: "Invalid school ID" });
    try {
        const [rows] = await db.query(
            "SELECT * FROM schools WHERE id = ?",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ status: 'FAILED', message: "School not found" });
        }
        res.status(202).json({ status: 'SUCCESS', data: rows[0] });
    } catch (error) {
        console.log(error);
        res.status(505).json({ status: 'FAILED', message: 'Internal server error' });
    }
});

router.post("/addSchool", async (req, res) => {
    try {
        const { error, value } = schoolSchema.validate(req.body, { abortEarly: false })
        console.log(value);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({
                status: "FAILED", message: "Validation failed", errors: errorMessages,
            });
        }
        const { name, address, latitude, longitude } = value;
        const [result] = await db.query(
            `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
            [name, address, latitude, longitude]
        );
        const newSchool = {
            id: result.insertId,
            name,
            address,
            latitude,
            longitude,
        };
        res.status(201).json({
            status: 'SUCCESS',
            message: 'Data added successfully',
            data: newSchool
        });
    } catch (error) {
        console.log(`Error while adding school ${error}`);
        return res.status(505).json({ status: 'FAILED', message: "Internal server error" });
    }
});

router.put("/updateSchool/:id", async (req, res) => {
    const { id } = req.params;
    const { error, value } = schoolSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({
            status: "FAILED", message: "Validation failed", errors: errorMessages,
        });
    }

    if (isNaN(id)) {
        return res.status(400).json({ status: "FAILED", message: "Invalid school ID" });
    }

    try {
        const { name, address, latitude, longitude } = value;
        const [result] = await db.query(
            `UPDATE schools
       SET name = ?, address = ?, latitude = ?, longitude = ?
       WHERE id = ?`,
            [name, address, latitude, longitude, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "FAILED", message: "School not found" });
        }
        const [rows] = await db.query(
            "SELECT * FROM schools WHERE id = ?",
            [id]
        );
        res.status(200).json({ status: "SUCCESS", message: "School updated successfully", data: rows[0] });
    } catch (err) {
        console.error("Updating error:", err);
        res.status(500).json({ status: "FAILED", message: "Internal server error" });
    }
});

router.delete("/deleteSchool/:id", async (req, res) => {
    const { id } = req.params;
    if (isNaN(id))
        return res.status(400).json({ status: 'FAILED', message: "Invalid school ID" });

    try {
        const [result] = await db.query(
            "DELETE FROM schools WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'FAILED', message: "School not found" });
        }

        res.status(200).json({ status: 'SUCCESS', message: "School deleted successfully" });
    } catch (err) {
        console.error("Deleting error:", err);
        res.status(500).json({ status: "FAILED", message: "Internal server error" });
    }
});


module.exports = router;