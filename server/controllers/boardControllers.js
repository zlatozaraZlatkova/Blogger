const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { getAll, createItem, updateItem, deleteById } = require("../services/boardService");
const { isBoardOwner } = require("../middlewares/guards");
const { errorParser } = require("../utils/errorParser");

router.get("/", async (req, res) => {
    try {
        const boards = await getAll();

        if (boards.length === 0) {
            return res.status(404).json({ message: "There are no boards available yet" });
        }

        res.json(boards);

    } catch (error) {
        const message = errorParser(error);
        res.status(400).json({ message });
    }

});

router.get("/:id", isBoardOwner(), async (req, res) => {
    try {

        const board = res.locals.board;

        res.json(board);

    } catch (error) {
        const message = errorParser(error);
        res.status(400).json({ message });
    }

});

router.post("/create",
    body("title", "Board title is required").not().isEmpty(),
    body("title", "Please enter a title up to 20 characters long").isLength({ max: 20 }),
    body("sections", "Sections array is required").isArray(),
    body("sections.*.title", "Section title is required").not().isEmpty(),
    body("sections.*.title", "Section title must be 2-20 characters").isLength({ min: 2, max: 20 }),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const userId = req.user._id;
            const { title, sections } = req.body;

            const board = {
                title: title,
                ownerId: userId,
            };

            const createdBoard = await createItem(userId, board, sections);

            res.json(createdBoard);

        } catch (error) {
            const message = errorParser(error);
            res.status(400).json({ message });
        }

    }
);

router.put("/:id/edit", isBoardOwner(),
    body("title", "Board title is required").not().isEmpty(),
    body("title", "Please enter a title up to 20 characters long").isLength({ max: 20 }),
    async (req, res) => {
       
        try {
            const { errors } = validationResult(req);
            const board = res.locals.board;


            if (errors.length > 0) {
                throw errors;
            }

            const updatedBoard = await updateItem(board._id, req.body);

            res.json(updatedBoard);


        } catch (error) {
            console.log(error)
            const message = errorParser(error);
            res.status(400).json({ message });

        }


    })

router.delete("/:id/delete", isBoardOwner(),
 async (req, res) => {

    try {
        const userId = req.user._id;
        const board = res.locals.board;

        await deleteById(board._id, userId);
        res.json({ message: "Board deleted" });

    } catch (error) {
        const message = errorParser(error);
        res.status(400).json({ message });

    }
})



module.exports = router;
