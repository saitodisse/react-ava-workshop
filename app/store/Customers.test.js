import test from 'ava';
import sinon from 'sinon';
import store from './Customers';

test('customers should start with empty', t => {
  const customers = store.getCustomers();
  t.true(customers.length === 0);
});

test('setting customers and getting them', t => {
  const c0 = {name: 'Bill'};
  const c1 = {name: 'Francine'};
  const c2 = {name: 'John'};
  store.setCustomers([c0, c1, c2]);
  const customers = store.getCustomers();
  const [sc0, sc1, sc2] = customers;
  t.true(customers.length === 3);
  t.deepEqual(c0, sc0);
  t.deepEqual(c1, sc1);
  t.deepEqual(c2, sc2);
});

test('subscribing to the store', t => {
  const spy = sinon.spy();
  const unsubscribe = store.subscribe(spy);
  store.setCustomers([]);
  t.true(spy.calledOnce);
  spy.reset();
  unsubscribe();
  store.setCustomers([]);
  t.false(spy.called);
});

test.afterEach(() => store.setCustomers([]));
