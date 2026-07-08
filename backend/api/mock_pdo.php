<?php
// Mock PDO emulation for local testing without MySQL - Yahyah-Sparkle

class MockPDO {
    private $dbPath;
    private $data;
    private $lastInsertId = 0;

    public function __construct($dbPath) {
        $this->dbPath = $dbPath;
        if (file_exists($dbPath)) {
            $this->data = json_decode(file_get_contents($dbPath), true);
        } else {
            $this->data = [
                'users' => [],
                'categories' => [],
                'products' => [],
                'hero' => []
            ];
        }
    }

    public function prepare($sql) {
        return new MockPDOStatement($this, $sql);
    }

    public function query($sql) {
        $stmt = new MockPDOStatement($this, $sql);
        $stmt->execute();
        return $stmt;
    }

    public function lastInsertId() {
        return $this->lastInsertId;
    }

    public function getData() {
        return $this->data;
    }

    public function saveData($newData) {
        $this->data = $newData;
        file_put_contents($this->dbPath, json_encode($newData, JSON_PRETTY_PRINT));
    }

    public function setLastInsertId($id) {
        $this->lastInsertId = $id;
    }
}

class MockPDOStatement {
    private $pdo;
    private $sql;
    private $results = [];
    private $cursor = 0;

    public function __construct($pdo, $sql) {
        $this->pdo = $pdo;
        $this->sql = $sql;
    }

    public function execute($params = []) {
        $data = $this->pdo->getData();
        $sqlLower = strtolower(trim($this->sql));

        // SELECT query handling
        if (strpos($sqlLower, 'select') === 0) {
            // Emulate data fetching based on table keywords
            if (strpos($sqlLower, 'from users') !== false) {
                $this->results = $data['users'] ?? [];
            } elseif (strpos($sqlLower, 'from categories') !== false) {
                $this->results = $data['categories'] ?? [];
                // Join stats
                if (strpos($sqlLower, 'count(p.id)') !== false) {
                    $prods = $data['products'] ?? [];
                    foreach ($this->results as &$cat) {
                        $count = 0;
                        foreach ($prods as $p) {
                            if (isset($p['category_id']) && $p['category_id'] == $cat['id']) {
                                $count++;
                            }
                        }
                        $cat['product_count'] = $count;
                    }
                }
            } elseif (strpos($sqlLower, 'from products') !== false) {
                $this->results = $data['products'] ?? [];
                // Join categories
                foreach ($this->results as &$prod) {
                    $catId = $prod['category_id'] ?? null;
                    $catName = 'Uncategorized';
                    if ($catId) {
                        foreach (($data['categories'] ?? []) as $c) {
                            if ($c['id'] == $catId) {
                                $catName = $c['name'];
                                break;
                            }
                        }
                    }
                    $prod['category_name'] = $catName;
                }
            } elseif (strpos($sqlLower, 'from hero') !== false) {
                $this->results = $data['hero'] ?? [];
            }

            // Emulate simple filters
            if (strpos($sqlLower, 'username = ?') !== false && !empty($params)) {
                $this->results = array_values(array_filter($this->results, function($u) use ($params) {
                    return strtolower($u['username'] ?? '') === strtolower($params[0]);
                }));
            }

            if (strpos($sqlLower, 'p.is_active = 1') !== false) {
                $this->results = array_values(array_filter($this->results, function($p) {
                    return isset($p['is_active']) && $p['is_active'] == 1;
                }));
            }

            if (strpos($sqlLower, 'p.category_id = ?') !== false) {
                // Find parameter position or assume the last
                $catId = end($params);
                $this->results = array_values(array_filter($this->results, function($p) use ($catId) {
                    return isset($p['category_id']) && $p['category_id'] == $catId;
                }));
            }

            if (strpos($sqlLower, 'p.id = ?') !== false && !empty($params)) {
                $this->results = array_values(array_filter($this->results, function($p) use ($params) {
                    return $p['id'] == $params[0];
                }));
            }

            // Count total
            if (strpos($sqlLower, 'count(*)') !== false && strpos($sqlLower, 'count(p.id)') === false) {
                $this->results = [['total' => count($this->results)]];
            }
        }
        // INSERT query handling
        elseif (strpos($sqlLower, 'insert into') === 0) {
            if (strpos($sqlLower, 'insert into users') !== false) {
                $newId = count($data['users']) + 1;
                $data['users'][] = [
                    'id' => $newId,
                    'username' => $params[0],
                    'password' => $params[1],
                    'role' => $params[2],
                    'created_at' => date('c')
                ];
                $this->pdo->setLastInsertId($newId);
            } elseif (strpos($sqlLower, 'insert into categories') !== false) {
                $newId = count($data['categories']) + 1;
                $data['categories'][] = [
                    'id' => $newId,
                    'name' => $params[0],
                    'description' => $params[1]
                ];
                $this->pdo->setLastInsertId($newId);
            } elseif (strpos($sqlLower, 'insert into products') !== false) {
                $newId = count($data['products']) + 1;
                $data['products'][] = [
                    'id' => $newId,
                    'name' => $params[0],
                    'description' => $params[1],
                    'price' => $params[2],
                    'category_id' => $params[3],
                    'images' => $params[4],
                    'is_active' => $params[5],
                    'created_at' => date('c')
                ];
                $this->pdo->setLastInsertId($newId);
            }
            $this->pdo->saveData($data);
        }
        // UPDATE query handling
        elseif (strpos($sqlLower, 'update') === 0) {
            if (strpos($sqlLower, 'update categories') !== false) {
                $id = $params[2];
                foreach ($data['categories'] as &$cat) {
                    if ($cat['id'] == $id) {
                        $cat['name'] = $params[0];
                        $cat['description'] = $params[1];
                    }
                }
            } elseif (strpos($sqlLower, 'update products') !== false) {
                // UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, images = ?, is_active = ? WHERE id = ?
                $id = $params[6];
                foreach ($data['products'] as &$prod) {
                    if ($prod['id'] == $id) {
                        $prod['name'] = $params[0];
                        $prod['description'] = $params[1];
                        $prod['price'] = $params[2];
                        $prod['category_id'] = $params[3];
                        $prod['images'] = $params[4];
                        $prod['is_active'] = $params[5];
                    }
                }
            } elseif (strpos($sqlLower, 'update hero') !== false) {
                // UPDATE hero SET heading = ?, description = ?, primary_cta_text = ?, primary_cta_link = ?, secondary_cta_text = ?, secondary_cta_link = ?, is_enabled = ?, background_image = ? WHERE id = ?
                if (isset($data['hero'][0])) {
                    $hero = &$data['hero'][0];
                    $hero['heading'] = $params[0];
                    $hero['description'] = $params[1];
                    $hero['primary_cta_text'] = $params[2];
                    $hero['primary_cta_link'] = $params[3];
                    $hero['secondary_cta_text'] = $params[4];
                    $hero['secondary_cta_link'] = $params[5];
                    $hero['is_enabled'] = $params[6];
                    $hero['background_image'] = $params[7];
                }
            } elseif (strpos($sqlLower, 'update users') !== false) {
                $id = end($params);
                foreach ($data['users'] as &$usr) {
                    if ($usr['id'] == $id) {
                        $usr['username'] = $params[0];
                        if (count($params) === 4) {
                            $usr['password'] = $params[1];
                            $usr['role'] = $params[2];
                        } else {
                            $usr['role'] = $params[1];
                        }
                    }
                }
            }
            $this->pdo->saveData($data);
        }
        // DELETE query handling
        elseif (strpos($sqlLower, 'delete') === 0) {
            if (strpos($sqlLower, 'from products') !== false) {
                $id = $params[0];
                $data['products'] = array_values(array_filter($data['products'], function($p) use ($id) {
                    return $p['id'] != $id;
                }));
            } elseif (strpos($sqlLower, 'from categories') !== false) {
                $id = $params[0];
                $data['categories'] = array_values(array_filter($data['categories'], function($c) use ($id) {
                    return $c['id'] != $id;
                }));
                // Set product references to null
                foreach ($data['products'] as &$p) {
                    if (isset($p['category_id']) && $p['category_id'] == $id) {
                        $p['category_id'] = null;
                    }
                }
            } elseif (strpos($sqlLower, 'from users') !== false) {
                $id = $params[0];
                $data['users'] = array_values(array_filter($data['users'], function($u) use ($id) {
                    return $u['id'] != $id;
                }));
            }
            $this->pdo->saveData($data);
        }

        return true;
    }

    public function fetch() {
        if ($this->cursor < count($this->results)) {
            return $this->results[$this->cursor++];
        }
        return null;
    }

    public function fetchAll() {
        return $this->results;
    }

    public function fetchColumn($colIdx = 0) {
        $row = $this->fetch();
        if ($row) {
            return array_values($row)[$colIdx];
        }
        return 0;
    }
}
