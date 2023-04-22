import { describe, before, after, it, test } from 'node:test'
import assert, { deepStrictEqual, ok, strictEqual } from 'node:assert'
import { tap, spec, dot } from 'node:test/reporters';
const BASE_URL = 'https://gem-octagonal-aletopelta.glitch.me'


describe('States and cities from Brazil', () => {

  it('Should return the list with states from Brazil - 200', async () => {

    const request = await fetch(`${BASE_URL}/estados`, {
      method: 'GET',
    })

    strictEqual(request.status, 200)
    const response = await request.json()
    const responseBody = JSON.stringify(response)
  
    assert.match(responseBody, /São Paulo/)
    assert.match(responseBody, /Rio de Janeiro/)
    assert.match(responseBody, /Minas Gerais/)
    assert.match(responseBody, /Espírito Santo/)   
    assert.doesNotMatch(responseBody, /New York/)

  })

  it('Should return error when request for a wrong endpoint - 404', async () => {

    const request = await fetch(`${BASE_URL}/wrong`, {
      method: 'GET',
    })

    strictEqual(request.status, 404)
    assert.strictEqual(request.statusText, "Not Found")
    
  })

  it('Should return information about São Paulo state - 200 ', async () => {

    const request = await fetch(`${BASE_URL}/estados/SP`, {
      method: 'GET',
    })

    strictEqual(request.status, 200)
    const response = await request.json()

    assert.strictEqual(response[0].nome, "São Paulo")
    assert.strictEqual(response[0].sigla, "SP")
    assert.strictEqual(response[0].regiao, "Sudeste")

  })

  it('Should return cities from São Paulo state - 200 ', async () => {

    const request = await fetch(`${BASE_URL}/estados/SP/cidades`, {
      method: 'GET',
    })

    strictEqual(request.status, 200)
    const response = await request.json()
    const responseBody = JSON.stringify(response)
  
    assert.match(responseBody, /São Paulo/)
    assert.doesNotMatch(responseBody, /Salvador/)
    assert.equal(response[0].id, "3500105")
    
  })

  it('Should return information about São Paulo city - 200 ', async () => {

    const request = await fetch(`${BASE_URL}/estados/SP/cidades/São Paulo`, {
      method: 'GET',

    })
    strictEqual(request.status, 200)
    const response = await request.json()

    assert.strictEqual(response[0].nome, "São Paulo")
    assert.strictEqual(response[0].estado, "São Paulo")

  })

})