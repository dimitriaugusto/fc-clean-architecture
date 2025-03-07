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


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe('Unit test: Create product use case', () => {

    it('should create a product os each type', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const outputA = await createProductUseCase.execute(inputA);
        expect(outputA).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price
        });
        expect(productRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            _id: expect.any(String),
            _name: inputA.name,
            _price: inputA.price
        }));


        const outputB = await createProductUseCase.execute(inputB);
        expect(outputB).toEqual({
            id: expect.any(String),
            name: inputB.name,
            price: inputB.price * 2
        });
        expect(productRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            _id: expect.any(String),
            _name: inputB.name,
            _price: inputB.price
        }));
    });



    it('should raise an error when name is empty', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const inputEmptyName = {
            type: 'a',
            name: '',
            price: 100,
        };

        await expect(createProductUseCase.execute(inputEmptyName)).rejects.toThrow('Name is required');
    });


    it('should raise an error when price is not greater than 0', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const inputInvalidPrice = {
            type: 'a',
            name: 'Product 3',
            price: -1,
        };

        await expect(createProductUseCase.execute(inputInvalidPrice)).rejects.toThrow('Price must be greater than zero');
    });

});