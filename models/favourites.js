module.exports = function (sequelize, DataTypes){
	return sequelize.define('Favourite',
          { fav: {
               type: DataTypes.INTEGER,
          },
          
   	  }
        );
}
