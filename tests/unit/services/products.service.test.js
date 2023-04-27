const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models')
const { productsMock, productMock, productsSearchMock, expectedUpdateProductSucessMock, expectedUpdateProductUnsucessMock } = require('./mocks/products.service.mocks');
const { productsService } = require('../../../src/services');

describe('Testa o service Products', function () {
  this.afterEach(() => {
    sinon.restore();
  })
  describe('Testa a rota pra listar todos os produtos', function () {
    it('com sucesso', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);

      const products = await productsService.getAll();

      expect(products.type).to.be.equal(null);
      expect(products.message).to.be.an('array');
      expect(products.message).to.be.deep.equal(productsMock);
    })
  })

  describe('Testa a rota pra listar um unico produto baseado no id', function () {
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

  describe('Testa a rota pra listar produtos baseado na busca', function () {
    it('com termo de busca', async function () {
      sinon.stub(productsModel, 'getBySearch').resolves(productsSearchMock);

      const products = await productsService.getBySearch('M');

      expect(products.type).to.be.equal(null);
      expect(products.message).to.deep.equal(productsSearchMock);
    });

    it('sem termo de busca', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);

      const products = await productsService.getBySearch();

      expect(products.type).to.be.equal(null);
      expect(products.message).to.deep.equal(productsMock);
    })
  })

  describe('Testa a rota pra atualizar produtos', function () {
    it('com id existente, com sucesso', async function () {
      sinon.stub(productsModel, 'getById').resolves(expectedUpdateProductSucessMock.message)
      sinon.stub(productsModel, 'update').resolves(1)

      const response = await productsService.update('Travesseiro', 2);

      expect(response.type).to.be.equal(null);
      expect(response.message).to.be.deep.equal(expectedUpdateProductSucessMock.message)
    })

    it('com id inexistente', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined)

      const response = await productsService.update('Travesseiro', 2);

      expect(response.type).not.to.be.equal(null);
      expect(response.message).to.be.deep.equal(expectedUpdateProductUnsucessMock.message)
    })
  })

  describe('Testa a rota pra deletar produtos', function () {
    it('com id existente', async function () {
      sinon.stub(productsModel, 'getById').resolves(productMock);
      sinon.stub(productsModel, 'deleteProduct').resolves(1);
      
      const response = await productsService.deleteProduct(5);

      expect(response.type).to.be.equal(null);
      expect(response.message).to.be.deep.equal('')
      
    })

    it('com id inexistente', async function () {
      sinon.stub(productsModel, 'getById').resolves(undefined);
      
      const response = await productsService.deleteProduct(9999);

      expect(response.type).not.to.be.equal(null);
      expect(response.message).to.be.deep.equal('Product not found')
      
    })
  })
})