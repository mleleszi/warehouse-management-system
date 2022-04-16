import BlueprintDto from './blueprint.dto';

export default interface ProductCreateDto {
  name: string;
  blueprints: BlueprintDto[];
}
