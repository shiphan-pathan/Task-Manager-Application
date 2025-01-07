// Models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'tasks',
    timestamps: true, 
});

module.exports = Task;
