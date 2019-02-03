const { writeToDb } = require('./write');
const { readFromDb } = require('./read');
const { exec } = require('child_process');

jest.setTimeout(30000);

// create infrastructure we need for the application
beforeAll(() => {
  return new Promise(resolve => {
    exec('terraform apply --auto-approve', (error, stdout, stderr) => {
      console.log('ERROR: ', error);
      console.log('STDOUT: ', stdout);
      console.log('STDERR: ', stderr);
      resolve();
    });
  });
});

// clean up and destroy the infrastructure
afterAll(() => {
  return new Promise(resolve => {
    exec('terraform destroy --force', (error, stdout, stderr) => {
      console.log('ERROR: ', error);
      console.log('STDOUT: ', stdout);
      console.log('STDERR: ', stderr);
      resolve();
    });
  });
});

describe('Testing our application', () => {
  // unit testing insertion
  test('writeToDb function', async () => {
    const dbRes = await writeToDb('mySampleValue');

    expect(dbRes).toEqual({});
  });

  // unit testing reading
  test('readFromDb function', async () => {
    const dbRes = await readFromDb('unknown');

    expect(dbRes).toEqual({});
  });

  // actually testing our orchestra the way its going to work in prod
  test('if data is written and read correctly from table', async () => {
    const sampleKey = 'orchestra';

    await writeToDb(sampleKey);
    const { Item: { sampleId } } = await readFromDb(sampleKey);

    expect(sampleId.S).toBe(sampleKey);
  });
});
