import ListProductsUseCase from "./list.products.usecase";

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockResolvedValue([
            { id: 1, name: 'Product 1', price: 100 },
            { id: 2, name: 'Product 2', price: 200 },
        ]),
    }
};

describe('Test list products use case', () => {

    it('should list products', async () => {
        const repository = MockRepository();
        const listProductsUseCase = new ListProductsUseCase(repository);
        const products = await listProductsUseCase.execute({});

        expect(products).toEqual(
            {
                products:
                    [
                        { id: 1, name: 'Product 1', price: 100 },
                        { id: 2, name: 'Product 2', price: 200 },
                    ]
            }

        );
        expect(repository.findAll).toHaveBeenCalled();
    });
});