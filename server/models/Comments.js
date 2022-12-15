module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Comments
}