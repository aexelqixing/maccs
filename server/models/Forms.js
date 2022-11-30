module.exports = (sequelize, DataTypes) => {
    const Forms = sequelize.define("Forms", {
        proposalName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Forms
}