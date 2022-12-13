module.exports = (sequelize, DataTypes) => {
    const Forms = sequelize.define("Forms", {
        student: {
            type: DataTypes.STRING,
            allowNull: false
        },
        proposalName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        proposalDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        streetAddress: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zipcode: {
            type: DataTypes.STRING,
        },
        isHighNeeds: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "requested",
        },
        hours: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    Forms.associate = (models) => {
        Forms.hasMany(models.Comments, {
            onDelete: "cascade",
        })
    }

    return Forms
}