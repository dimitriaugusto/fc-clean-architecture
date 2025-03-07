import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create('a', 'Product 1', 100);

const input = {
    id: product.id,
    name: "Updated Product 1",
    price: 150,
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
}

describe('UpdateProductUseCase', () => {

    it('should update a product successfully', async () => {

        const repository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(repository);
        const result = await updateProductUseCase.execute(input);

        expect(result).toEqual(input);
        expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when product not found', async () => {
        const repository = MockRepository();
        repository.find.mockReturnValue(Promise.resolve(null));
        const updateProductUseCase = new UpdateProductUseCase(repository);

        await expect(updateProductUseCase.execute(input)).rejects.toThrow('Product not found');
    })
});