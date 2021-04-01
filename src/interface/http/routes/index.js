const express = require('express');

// const ChallengesRoutes = require('../../../modules/challenges/infra/http/routes/ChallengesRoutes');
const authRouter = require('./authRoutes');
const profileRouter = require('./profileRoutes');

const DevController = require('../../../controllers/DevController');
const NewsletterController = require('../../../controllers/NewsletterController');
const ChallengeController = require('../controllers/ChallengeController');

class Routes {
  constructor(container) {
    this.router = express.Router();
    this.container = container;

    this.mountRoutes();
  }

  mountRoutes() {
    this.mountChallengesRouter();
    this.mountAuthRouter();
    this.mountProfileRouter();
    this.mountDevsRouter();
    this.mountNewsletterRouter();
  }

  mountDevsRouter() {
    this.router.get('/devs', DevController.index);
    this.router.post('/devs', DevController.store);
  }

  mountChallengesRouter() {
    this.router.get('/challenges', (req, res) =>
      new ChallengeController(req, res).index()
    );
    this.router.get('/challenges/:challenge_id', (req, res) =>
      new ChallengeController(req, res).show()
    );
    this.router.post('/challenges', (req, res) =>
      new ChallengeController(req, res).create()
    );
  }

  mountNewsletterRouter() {
    this.router.get('/newsletter', NewsletterController.index);
    this.router.post('/newsletter', NewsletterController.store);
  }

  mountAuthRouter() {
    this.router.use('/auth', authRouter);
  }

  mountProfileRouter() {
    this.router.use('/profile', profileRouter);
  }
}

module.exports = new Routes().router;