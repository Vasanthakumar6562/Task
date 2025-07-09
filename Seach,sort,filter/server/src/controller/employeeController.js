const Employee = require("../model/employee");
const { buildQuery } = require("../utils/queryBuilder");

exports.createEmployee = async (req, res) => {
  try {
    const { name, age, role, skills, address } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const newEmployee = new Employee({
      name,
      age,
      role,
      skills,
      address,
      profileImage,
    });
    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee created", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const {filter,sortBy} = buildQuery(req.query)
      const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (pageNumber - 1) * pageLimit;

    const employees = await Employee.find(filter).sort(sortBy).skip(skip).limit(pageLimit);
    const totalCount = await Employee.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
        data:employees,
        totalPages
    }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      age: req.body.age,
      role: req.body.role,
      skills: req.body.skills,
      address: req.body.address,
    };

     if (req.file) {
      updateData.profileImage = "/uploads/" + req.file.filename;
    }

    const updateEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated", employee: updateEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await Employee.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted", deleteData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
