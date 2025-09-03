const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            status,
            user: req.user
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user }).sort({ date: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Tarefa não encontrada' });
        }
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ msg: 'Acesso negado' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Acesso negado' });
    }
    await task.deleteOne();
    res.status(200).json({ msg: 'Tarefa removida' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

