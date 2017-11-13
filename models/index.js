var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
}, {
    hooks: {
        beforeValidate: function(page) {
            page.urlTitle = generateUrlTitle(page.title);
    }
    }
});

function generateUrlTitle (title) {
    if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        // Generates random 5 letter string
        return Math.random().toString(36).substring(2, 7);
    }
}


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
        
    }
});

var route =  db.define('route', {
    urlTitle: Sequelize.STRING,
}, {
    getterMethods: {
        route() {
            return '/wiki/' + this.urlTitle;
        }
    }
}
)

module.exports = {
  Page: Page,
  User: User,
  db: db,
  route: route
};
