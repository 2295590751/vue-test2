import Mock from 'mockjs';
import banner from './banner';
import floor from './floor';

//mock数据：第一个参数请求地址，第二个参数请求数据
Mock.mock('/mock/banner', { code: 200, data: banner }); //模拟首页大的轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor });
