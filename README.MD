We have four tests in this suite.
You need to install cypress in order to run these tests (https://docs.cypress.io/guides/getting-started/installing-cypress)
Filter test falls because price filtering doesn't work precisely on the site, it throws in results with a little higher price than what was set.
POM wasn't used for this suite, because after adding commands (support/commands.js) didn't see much use of it.