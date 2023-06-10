import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/login/index'
import Revision from '../components/revision/index'
import Reports from '../components/reports/index'
import Items from '../components/items/index'
import Inventory from '../components/inventory/index'
import Computers from '../components/computers/index'
import Classrooms from '../components/classrooms/index'
import User from '../components/user';

describe('Integraciones de los componentes principales del menu', () => {
  it('Integración de Revision', () => {
    const wrapper = shallow(<Revision />);
    expect(wrapper.exists()).toBe(true);
  });
  it('Integración de Reportes', () => {
    const wrapper = shallow(<Reports />);
    expect(wrapper.exists()).toBe(true);
  });
  it('Integración de Items', () => {
    const wrapper = shallow(<Items />);
    expect(wrapper.exists()).toBe(true);
  });
  it('Integración de Inventory', () => {
    const wrapper = shallow(<Inventory />);
    expect(wrapper.exists()).toBe(true);
  });
  it('Integración de Computers', () => {
    const wrapper = shallow(<Computers />);
    expect(wrapper.exists()).toBe(true);
  });
  it('Integración de Classrooms', () => {
    const wrapper = shallow(<Classrooms />);
    expect(wrapper.exists()).toBe(true);
  });
  
  
});
describe('Integración de componente de gestor de usuario', () => {
  it('Integración usuarios', () => {
    const wrapper = shallow(<User />);
    expect(wrapper.exists()).toBe(true);
  });
});
describe('Integracion de Login, componente inicial', () => {
  it('Integración de Login', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });
});