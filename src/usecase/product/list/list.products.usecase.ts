import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDto, OutputListProductsDto } from "./list.products.dto";

export default class ListProductsUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(entityList: ProductInterface[]): OutputListProductsDto {
        return {
            products: entityList.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        }
    }
}
