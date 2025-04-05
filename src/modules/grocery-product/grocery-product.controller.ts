import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  ParseIntPipe 
} from '@nestjs/common';
import { GroceryProductService } from './grocery-product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('grocery-products')
export class GroceryProductController {
  constructor(private readonly productService: GroceryProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: any) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  // Variant endpoints
  @Get(':productId/variants')
  findAllVariants(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findAllVariants(productId);
  }

  @Get(':productId/variants/:variantId')
  findOneVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
  ) {
    return this.productService.findOneVariant(productId, variantId);
  }

  @UseGuards(AdminGuard)
  @Post('variants')
  createVariant(@Body() createVariantDto: CreateVariantDto) {
    return this.productService.createVariant(createVariantDto);
  }

  @UseGuards(AdminGuard)
  @Put(':productId/variants/:variantId')
  updateVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.productService.updateVariant(productId, variantId, updateVariantDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':productId/variants/:variantId')
  removeVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
  ) {
    return this.productService.removeVariant(productId, variantId);
  }

  @UseGuards(AdminGuard)
  @Put(':productId/variants/:variantId/inventory')
  updateVariantInventory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.productService.updateVariantInventory(productId, variantId, quantity);
  }
}
