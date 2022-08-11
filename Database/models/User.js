const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    }
    User.init({
        Username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: "profile_abeli",
        tableName: "user",
        timestamps: false
    });
    return User;
}