import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";
import FindProductUseCase from "./find.product.usecase";

const productA = new Product('1', 'Product 1', 100);
const productB = new ProductB('2', 'Product 2', 100);


const MockRepositoryA = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(productA)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};
const MockRepositoryB = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(productB)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe('Unit test: find product use case', () => {
    it('should find a product', async () => {
        const productRepositoryA = MockRepositoryA();
        const usecaseA = new FindProductUseCase(productRepositoryA);

        const inputA = {
            id: '1',
        };

        const outputA = {
            id: '1',
            name: 'Product 1',
            price: 100,
        };

        const resultA = await usecaseA.execute(inputA);
        expect(resultA).toEqual(outputA);

        const productRepositoryB = MockRepositoryB();
        const usecaseB = new FindProductUseCase(productRepositoryB);

        const inputB = {
            id: '1',
        };

        const outputB = {
            id: '2',
            name: 'Product 2',
            price: 200,
        };

        const resultB = await usecaseB.execute(inputB);
        expect(resultB).toEqual(outputB);
    });

    it('should not find a product', async () => {
        const productRepository = MockRepositoryA();
        productRepository.find.mockImplementation(() => {
            throw new Error('Product not found');
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: '123',
        };

        await expect(usecase.execute(input)).rejects.toThrow('Product not found');
    });
});