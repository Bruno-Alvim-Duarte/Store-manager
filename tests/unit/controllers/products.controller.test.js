const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);
const { productsService } = require('../../../src/services');
const { productsMock, productMock, productNotFoundMock } = require('./mocks/products.controller.mocks');
const { productsController } = require('../../../src/controllers');

describe('Testa o controller Products', function () {
  this.afterEach(() => {
    sinon.restore();
  })
  describe('Testa a rota pra todos os produtos', function () {
    it('com sucesso', async function () {
      sinon.stub(productsService, 'getAll').resolves(productsMock);
      const req = {}
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock.message);

    })
  })

  describe('Testa a rota pra um produto', function () {
    this.afterEach(() => {
      sinon.restore();
    })
    it('com sucesso', async function () {
      sinon.stub(productsService, 'getById').resolves(productMock);
      const req = { params: { id: 5 } }
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock.message);
    });

    it('com um id inexistente', async function () {
      sinon.stub(productsService, 'getById').resolves(productNotFoundMock);
      const req = { params: { id: 9999 } }
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    })
  })
})