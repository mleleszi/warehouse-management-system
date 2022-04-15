import { Repository } from "typeorm";

export class Controller {
  repository: Repository<any>;

  create = async (req, res) => {
    const entity = this.repository.create(req.body as {});

    try {
      entity.id = null;
      const entityInserted = await this.repository.save(entity);
      res.json(entityInserted);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const products = await this.repository.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getOne = async (req, res) => {
    const entityId = req.params.id;

    try {
      const entity = await this.repository.findOne({ where: { id: entityId } });
      if (!entity) {
        return res.status(404).json({ message: "not found" });
      }

      res.json(entity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req, res) => {
    const entity = this.repository.create(req.body as {});
    console.log(entity);
    try {
      const existingEntity = await this.repository.findOne({
        where: { id: entity.id },
      });
      if (!existingEntity) {
        return res.status(404).json({ message: "not found" });
      }

      const entityUpdated = await this.repository.save(entity);
      res.json(entityUpdated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res) => {
    try {
      const entityId = parseInt(req.params.id);
      const entity = await this.repository.findOne({ where: { id: entityId } });
      if (!entity) {
        return res.status(404).json({ message: "not found" });
      }

      const response = await this.repository.delete(entityId);
      res.status(200).json({ message: `deleted ${response.affected} rows` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
