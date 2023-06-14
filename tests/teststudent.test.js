const assert = require('assert');
const { createStudent, getStudentById, updateStudent, deleteStudent } = require('../routes/students');

describe('Student Controller', function () {
  beforeEach(async function () {
    // Set up any necessary test data or configurations
  });

  afterEach(async function () {
    // Clean up after each test
  });

  describe('createStudent', function () {
    it('should create a new student', async function () {
      // Write your test assertions using Mocha and assert library
      const newStudent = await createStudent({ name: 'John', age: 20 });
      assert.strictEqual(newStudent.name, 'John');
      assert.strictEqual(newStudent.age, 20);
    });
  });

  describe('getStudentById', function () {
    it('should get a specific student', async function () {
      // Write your test assertions using Mocha and assert library
      const student = await getStudentById(1);
      assert.strictEqual(student.id, 1);
    });

    it('should return 404 if student is not found', async function () {
      // Write your test assertions using Mocha and assert library
      try {
        await getStudentById(100);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.statusCode, 404);
        assert.strictEqual(error.message, 'Student not found');
      }
    });
  });

  describe('updateStudent', function () {
    it('should update a student', async function () {
      // Write your test assertions using Mocha and assert library
      const updatedStudent = await updateStudent(1, { name: 'Updated John', age: 21 });
      assert.strictEqual(updatedStudent.name, 'Updated John');
      assert.strictEqual(updatedStudent.age, 21);
    });

    it('should return 404 if student is not found', async function () {
      // Write your test assertions using Mocha and assert library
      try {
        await updateStudent(100, { name: 'Updated John', age: 21 });
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.statusCode, 404);
        assert.strictEqual(error.message, 'Student not found');
      }
    });
  });

  describe('deleteStudent', function () {
    it('should delete a student', async function () {
      // Write your test assertions using Mocha and assert library
      const deletedStudentId = await deleteStudent(1);
      assert.strictEqual(deletedStudentId, 1);
    });

    it('should return 404 if student is not found', async function () {
      // Write your test assertions using Mocha and assert library
      try {
        await deleteStudent(100);
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.statusCode, 404);
        assert.strictEqual(error.message, 'Student not found');
      }
    });
  });
});
