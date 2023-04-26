const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsMock, productMock } = require('./mocks/products.service.mocks');
const { productsService } = require('../../../src/services');

describe('Testa o service Products', function () {
  this.afterEach(() => {
    sinon.restore();
  })
  describe('Testa a rota pra todos os produtos', function () {
    it('com sucesso', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);

      const products = await productsService.getAll();

      expect(products.type).to.be.equal(null);
      expect(products.message).to.be.an('array');
      expect(products.message).to.be.deep.equal(productsMock);
    })
  })

  describe('Testa a rota pra um unico produto baseado no id', function () {
    this.afterEach(() => {
      sinon.restore()
    })
    it('com sucesso', async function () {
      sinon.stub(productsModel, 'getById').resolves(productMock);

      const product = await productsService.getById(6);

      expect(product.type).to.be.equal(null);
      expect(product.message).to.be.an('object');
      expect(product.message).to.be.deep.equal(productMock);
    })
  
    it('com id inexistente', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const product = await productsService.getById(6);

      expect(product.type).not.to.be.equal(null);
      expect(product.message).to.be.equal('Product not found');
    })
  })
})