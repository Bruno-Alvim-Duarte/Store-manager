const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/connection');
const { productsMock, productMock, productsSearchMock } = require('./mocks/products.model.mocks');
const { productsModel } = require('../../../src/models');

describe('Testa a model Products', function () {
  this.afterEach(() => {
    sinon.restore()
  })
  describe('testa a rota pra listar todos os produtos', () => { 
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(productsMock);
    });
  })
  
  describe('testa a rota para listar um unico produto pelo id', function () {
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([[productMock]]);

      const product = await productsModel.getById(6);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(productMock);
    })
  })

  describe('Testa a rota pra listar produtos baseado na busca', function () {
    it('com termo de busca', async function () {
      sinon.stub(connection, 'execute').resolves([productsSearchMock]);

      const products = await productsModel.getBySearch('M%');

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(productsSearchMock);
    });

    it('sem termo de busca', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const products = await productsModel.getBySearch();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(productsMock);
    })
  })

  describe('Testa a rota pra atualizar produtos', function () {
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1}])

      const response = await productsModel.update('Travesseiro', 2);

      expect(response).to.be.equal(1);
    })
  })

  describe('Testa a rota pra deletar produtos', function () {
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      
      const response = await productsModel.deleteProduct(5);

      expect(response).to.be.equal(1);
      
    })
  })

  describe('Testa a rota pra criar um produto', function () {
    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5}]);
  
      const response = await productsModel.create('Travesseiro do Bruno');
  
      expect(response).to.be.equal(5);
    })
  })
});