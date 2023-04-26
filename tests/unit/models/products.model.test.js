const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/connection');
const { productsMock, productMock } = require('./mocks/products.model.mocks');
const { productsModel } = require('../../../src/models');

describe('Testa a model Products', function () {
  this.afterEach(() => {
    sinon.restore()
  })
  describe('testa a rota pra todos os produtos', () => { 
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(productsMock);
    });
  })
  
  describe('testa a rota para um unico produto pelo id', function () {
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);

      const product = await productsModel.getById(6);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productMock);
    })
  })
});