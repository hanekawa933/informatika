"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const primaryKey = () => {
      return {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      };
    };
    const notNullString = (range) => {
      return {
        allowNull: false,
        type: Sequelize.STRING(range),
      };
    };

    const nullableString = (range) => {
      return {
        allowNull: true,
        type: Sequelize.STRING(range),
      };
    };

    const notNullInteger = () => {
      return {
        allowNull: false,
        type: Sequelize.INTEGER,
      };
    };

    const nullableInteger = () => {
      return {
        allowNull: false,
        type: Sequelize.INTEGER,
      };
    };

    const notNullDate = () => {
      return {
        allowNull: false,
        type: Sequelize.DATE,
      };
    };

    const notNullText = () => {
      return {
        allowNull: false,
        type: Sequelize.TEXT,
      };
    };

    const PKCascade = () => {
      return {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
      };
    };

    const references = (refTable) => {
      return {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: refTable,
          },
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          hooks: true,
        },
      };
    };

    const administrator = (tableName) => {
      queryInterface.createTable(tableName, {
        id: PKCascade(),
        username: notNullString(15),
        password: notNullString(255),
        nama: notNullString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      });
    };

    const penanggungJawab = (tableName) => {
      queryInterface.createTable(tableName, {
        id: PKCascade(),
        username: notNullString(15),
        password: notNullString(255),
        nama: notNullString(35),
        created_by: notNullString(35),
        updated_by: notNullString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      });
    };

    return await Promise.all([
      administrator("administrator"),
      penanggungJawab("pjAnggota"),
      penanggungJawab("pjDokumen"),
      penanggungJawab("pjEvent"),

      queryInterface.createTable("agama", {
        id: PKCascade(),
        agama: notNullString(30),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("anggota", {
        id: PKCascade(),
        nama_depan: notNullString(35),
        nama_belakang: notNullString(35),
        tempat: notNullString(35),
        tgl_lahir: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        agama_id: references("agama"),
        alamat: notNullString(),
        pekerjaan: notNullString(100),
        nim: notNullString(15),
        jabatan: notNullString(50),
        angkatan: notNullString(4),
        foto: notNullString(255),
        created_by: nullableString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("sosmed", {
        id: PKCascade(),
        email: notNullString(30),
        instagram: nullableString(30),
        twitter: nullableString(30),
        facebook: nullableString(30),
        whatsapp: notNullString(30),
        anggota_id: references("anggota"),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("event", {
        id: PKCascade(),
        nama: notNullString(255),
        description: notNullText(),
        harga: notNullInteger(),
        rules: notNullText(),
        poster: notNullString(255),
        lokasi: notNullString(255),
        tanggal: notNullDate(),
        created_by: nullableString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("pengunjung", {
        id: PKCascade(),
        nama_depan: notNullString(35),
        nama_belakang: notNullString(35),
        email: notNullString(100),
        no_telp: notNullString(20),
        validasi: {
          type: Sequelize.STRING(12),
          defaultValue: "tidak aktif",
        },
        event_id: references("event"),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("tamu", {
        id: primaryKey(),
        nama_tamu_1: notNullString(70),
        nama_tamu_2: nullableString(70),
        nama_tamu_3: nullableString(70),
        event_id: references("event"),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("tiket", {
        id: primaryKey(),
        pengunjung_id: references("pengunjung"),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),

      queryInterface.createTable("dokumen", {
        id: primaryKey(),
        nama: notNullString(70),
        description: notNullText(),
        sifat: notNullString(20),
        tipe_file: notNullString(20),
        file: notNullString(255),
        created_by: notNullString(35),
        updated_by: nullableString(35),
        createdAt: notNullDate(),
        updatedAt: notNullDate(),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable("administrator", { cascade: true }),
      queryInterface.dropTable("pjAnggota", { cascade: true }),
      queryInterface.dropTable("pjDokumen", { cascade: true }),
      queryInterface.dropTable("pjEvent", { cascade: true }),
      queryInterface.dropTable("sosmed"),
      queryInterface.dropTable("agama", { cascade: true }),
      queryInterface.dropTable("pengunjung", { cascade: true }),
      queryInterface.dropTable("tamu", { cascade: true }),
      queryInterface.dropTable("dokumen"),
      queryInterface.dropTable("anggota", { cascade: true }),
      queryInterface.dropTable("event", { cascade: true }),
      queryInterface.dropTable("tiket"),
    ]);
  },
};
