const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const app = require('../index');

describe('API Tests', () => {
    it('Debería devolver un array con archivos formateados', function(done) {
        this.timeout(5000);

        chai.request(app)
            .get('/files/data')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');

                res.body.forEach(file => {
                    expect(file).to.have.property('file').that.is.a('string');
                    expect(file).to.have.property('lines').that.is.an('array');
                    file.lines.forEach(line => {
                        expect(line).to.have.property('text').that.is.a('string');
                        expect(line).to.have.property('number').that.is.a('number');
                        expect(line).to.have.property('hex').that.is.a('string').with.lengthOf(32);
                    });
                });
                done();
            });
    });
});