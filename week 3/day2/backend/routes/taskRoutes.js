// routes/taskRoutes.js
const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validateRequest");
const auth = require("../middleware/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task CRUD operations
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks.
 */



router.get("/", auth, getTasks);


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task details.
 *       404:
 *         description: Task not found.
 */
router.get("/:id", auth, getTasks);



/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created.
 */

router.post(
  "/",
  auth,
  [body("title").notEmpty().withMessage("Title is required")],
  validate,
  createTask
);

router.put("/:id", auth, updateTask);



/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Task updated.
 */

router.patch("/:id", auth, updateTask);



/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted.
 */

router.delete("/:id", auth, deleteTask);

module.exports = router;
