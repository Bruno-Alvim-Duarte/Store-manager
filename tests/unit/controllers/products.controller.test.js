const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);
const { productsService } = require('../../../src/services');
const { productsMock, productMock, productNotFoundMock, productsSearchMock, updateProductSucess, updateProductUnsucess, deleteProductSucess, deleteProductUnsucess } = require('./mocks/products.controller.mocks');
const { productsController } = require('../../../src/controllers');

describe('Testa o controller Products', function () {
  this.afterEach(() => {
    sinon.restore();
  })
  describe('Testa a rota pra listar todos os produtos', function () {
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

  describe('Testa a rota pra listar um produto', function () {
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

  describe('Testa a rota pra listar produtos baseado na busca', function () {
    it('com sucesso', async function () {
      sinon.stub(productsService, 'getBySearch').resolves(productsSearchMock);

      const req = { query: { q: 'M'}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getBySearch(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsSearchMock.message);
    })
  })

  describe('Testa a rota pra atualizar produtos', function () {
    it('com id existente, com sucesso', async function () {
      sinon.stub(productsService, 'update').resolves(updateProductSucess)

      const req = { body: { name: 'Travesseiro'}, params: { id: 2 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.be.have.been.calledWith(updateProductSucess.message)
    })

    it('com id inexistente', async function () {
      sinon.stub(productsService, 'update').resolves(updateProductUnsucess)

      const req = { body: { name: 'Travesseiro'}, params: { id: 5555 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.be.have.been.calledWith({ message: 'Product not found'})
    })
  })

  describe('Testa a rota pra deletar produtos', function () {
    it('com id existente', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves(deleteProductSucess);

      const req = { params: { id: 5 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      
    })

    it('com id inexistente', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves(deleteProductUnsucess);

      const req = { params: { id: 9999 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      
    })
  })
})