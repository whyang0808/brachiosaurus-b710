import { DataTypes } from 'sequelize'
import { Model } from 'sequelize/types'
import { sequelize } from './index'
import { ContactAttributes } from '../../types/contact'

const Contact = sequelize.define<Model<ContactAttributes>>(
  'contacts',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    companyName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    roles: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    remarks: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }
)

export default Contact
