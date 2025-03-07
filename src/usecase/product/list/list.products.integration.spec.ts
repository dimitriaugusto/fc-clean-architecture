import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductsUseCase from "./list.products.usecase";

const inputA = {
    id: "1",
    name: 'Product 1',
    price: 100,
};

const inputB = {
    id: "2",
    name: 'Product 2',
    price: 100,
};

describe('Test list products use case', () => {

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

    it('should list products', async () => {
        const repository = new ProductRepository();
        const listProductsUseCase = new ListProductsUseCase(repository);

        ProductModel.create(inputA);
        ProductModel.create(inputB);

        const products = await listProductsUseCase.execute({});

        expect(products).toEqual(
            {
                products:
                    [
                        { id: "1", name: 'Product 1', price: 100 },
                        { id: "2", name: 'Product 2', price: 100 },
                    ]
            }

        );
    });
});