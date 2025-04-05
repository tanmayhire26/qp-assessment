import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroceryProduct } from '../../entities/grocery-product.entity';
import { GroceryCategory } from '../../entities/grocery-category.entity';
import { GroceryVariant } from '../../entities/grocery-variant.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class GroceryProductService {
  constructor(
    @InjectRepository(GroceryProduct)
    private productRepository: Repository<GroceryProduct>,
    @InjectRepository(GroceryCategory)
    private categoryRepository: Repository<GroceryCategory>,
    @InjectRepository(GroceryVariant)
    private variantRepository: Repository<GroceryVariant>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['category', 'variants'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'variants'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    console.log("createProductDto . . . . . . ", createProductDto);
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId });
    if (!category) {
      throw new NotFoundException(`Category #${createProductDto.categoryId} not found`);
    }

    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: any) {
    const product = await this.findOne(id);
    
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: updateProductDto.categoryId });
      if (!category) {
        throw new NotFoundException(`Category #${updateProductDto.categoryId} not found`);
      }
      product.category = category;
    }

    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }

  // Variant methods
  async findAllVariants(productId: number) {
    const product = await this.findOne(productId);
    return this.variantRepository.find({
      where: { product: { id: product.id } },
      relations: ['product'],
    });
  }

  async findOneVariant(productId: number, variantId: number) {
    const variant = await this.variantRepository.findOne({
      where: { id: variantId, product: { id: productId } },
      relations: ['product'],
    });

    if (!variant) {
      throw new NotFoundException(`Variant #${variantId} not found for product #${productId}`);
    }

    return variant;
  }

  async createVariant(createVariantDto: CreateVariantDto) {
    const product = await this.findOne(createVariantDto.productId);

    const variant = this.variantRepository.create({
      ...createVariantDto,
      product,
    });

    return this.variantRepository.save(variant);
  }

  async updateVariant(productId: number, variantId: number, updateVariantDto: UpdateVariantDto) {
    const variant = await this.findOneVariant(productId, variantId);
    
    this.variantRepository.merge(variant, updateVariantDto);
    return this.variantRepository.save(variant);
  }

  async removeVariant(productId: number, variantId: number) {
    const variant = await this.findOneVariant(productId, variantId);
    return this.variantRepository.remove(variant);
  }

  async updateVariantInventory(productId: number, variantId: number, quantity: number) {
    const variant = await this.findOneVariant(productId, variantId);
    variant.inventory = quantity;
    return this.variantRepository.save(variant);
  }
}
