import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create-product-usecase";

const inputA = {
    type: 'a',
    name: 'Product 1',
    price: 100,
};

const inputB = {
    type: 'b',
    name: 'Product 2',
    price: 100,
};

describe('Unit test: Create product use case', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product os each type', async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const outputA = await createProductUseCase.execute(inputA);
        expect(outputA).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price
        });

        const outputB = await createProductUseCase.execute(inputB);
        expect(outputB).toEqual({
            id: expect.any(String),
            name: inputB.name,
            price: inputB.price * 2
        });
    });

});