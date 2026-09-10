import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import {
  initDatabase,
  getDbStatus,
  getAllGTK,
  getGTKById,
  createGTK,
  updateGTK,
  deleteGTK,
  getGTKStats,
} from "./server/db.ts";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Initialize Database (MySQL or Structured File Persistence)
  await initDatabase();

  // API Routes
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: getDbStatus(),
    });
  });

  app.get("/api/db/status", (req: Request, res: Response) => {
    res.json(getDbStatus());
  });

  app.get("/api/db/schema.sql", (req: Request, res: Response) => {
    try {
      const sqlPath = path.join(process.cwd(), "schema.sql");
      if (fs.existsSync(sqlPath)) {
        const content = fs.readFileSync(sqlPath, "utf-8");
        res.setHeader("Content-Type", "text/plain");
        return res.send(content);
      }
      return res.status(404).send("schema.sql tidak ditemukan");
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Get statistics summary
  app.get("/api/gtk/stats/summary", async (req: Request, res: Response) => {
    try {
      const stats = await getGTKStats();
      res.json(stats);
    } catch (err: any) {
      res
        .status(500)
        .json({ error: err.message || "Gagal mengambil ringkasan statistik" });
    }
  });

  // Get all GTK with query filters (search q, tipe, status)
  app.get("/api/gtk", async (req: Request, res: Response) => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : undefined;
      const tipe =
        typeof req.query.tipe === "string" ? req.query.tipe : undefined;
      const status =
        typeof req.query.status === "string" ? req.query.status : undefined;

      const items = await getAllGTK({ q, tipe, status });
      res.json(items);
    } catch (err: any) {
      res
        .status(500)
        .json({ error: err.message || "Gagal mengambil data GTK" });
    }
  });

  // Get single GTK
  app.get("/api/gtk/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID tidak valid" });
      }
      const item = await getGTKById(id);
      if (!item) {
        return res.status(404).json({ error: "Data GTK tidak ditemukan" });
      }
      res.json(item);
    } catch (err: any) {
      res
        .status(500)
        .json({ error: err.message || "Gagal mengambil detail GTK" });
    }
  });

  // Create new GTK
  app.post("/api/gtk", async (req: Request, res: Response) => {
    try {
      const {
        nama,
        nip,
        nuptk,
        jenis_kelamin,
        tipe,
        jabatan,
        tugas_tambahan,
        status_kepegawaian,
        golongan,
        pendidikan_terakhir,
        jurusan,
        email,
        telepon,
        alamat,
        tanggal_lahir,
        tanggal_bergabung,
        status_aktif,
        foto_url,
      } = req.body;

      if (
        !nama ||
        !jenis_kelamin ||
        !tipe ||
        !jabatan ||
        !status_kepegawaian ||
        !pendidikan_terakhir ||
        !jurusan ||
        !email ||
        !telepon ||
        !alamat
      ) {
        return res.status(400).json({
          error:
            "Semua kolom wajib (Nama, Jenis Kelamin, Tipe, Jabatan, Status Kepegawaian, Pendidikan, Jurusan, Email, Telepon, Alamat) harus diisi.",
        });
      }

      const created = await createGTK({
        nama,
        nip: nip || "-",
        nuptk: nuptk || "-",
        jenis_kelamin,
        tipe,
        jabatan,
        tugas_tambahan: tugas_tambahan || "-",
        status_kepegawaian,
        golongan: golongan || "-",
        pendidikan_terakhir,
        jurusan,
        email,
        telepon,
        alamat,
        tanggal_lahir,
        tanggal_bergabung,
        status_aktif: status_aktif || "Aktif",
        foto_url,
      });

      res.status(201).json(created);
    } catch (err: any) {
      res
        .status(500)
        .json({ error: err.message || "Gagal menambahkan data GTK" });
    }
  });

  // Update GTK
  app.put("/api/gtk/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID tidak valid" });
      }

      const existing = await getGTKById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ error: "Data GTK yang ingin diubah tidak ditemukan" });
      }

      const updated = await updateGTK(id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Gagal mengubah data GTK" });
    }
  });

  // Delete GTK
  app.delete("/api/gtk/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID tidak valid" });
      }

      const existing = await getGTKById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ error: "Data GTK yang ingin dihapus tidak ditemukan" });
      }

      const success = await deleteGTK(id);
      if (success) {
        res.json({ message: "Data GTK berhasil dihapus", id });
      } else {
        res.status(500).json({ error: "Gagal menghapus data dari database" });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ error: err.message || "Gagal menghapus data GTK" });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server SIM GTK aktif di port ${PORT}`);
  });
}

startServer();
