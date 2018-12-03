describe('Api factory', function () {
  let ApiFactory;

  beforeEach(angular.mock.module('brastlewark'))

  beforeEach(inject(function (_ApiFactory_) {
    ApiFactory = _ApiFactory_
  }))
  it('ApiFactory shouldExist', function () {
    expect(ApiFactory).toBeDefined()
  })

  it('ApiFactory should be an object ', function () {
    expect(ApiFactory instanceof Object).toBeTruthy()
  })
  describe('Method getCitizens', function () {
    it('ApiFactory.getCitizens should exist ', function () {
      expect(ApiFactory.getCitizens).toBeDefined()
    })
  })
  describe('Method dataPage', function () {
    beforeEach(function () {
      spyOn(ApiFactory, 'dataPage')
    })
    it('ApiFactory.dataPage should exist ', function () {
      expect(ApiFactory.dataPage).toBeDefined()
    })
  })
})
