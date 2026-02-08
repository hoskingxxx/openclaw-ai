# Umami Tracking 验收测试

## 测试环境
- 线上: https://openclaw-ai.org/guides/hardware-requirements-reality-check
- 本地: http://localhost:3000/guides/hardware-requirements-reality-check

## 验收步骤

### 1. 打开浏览器开发者工具
```
F12 或 Cmd+Option+I
→ 切换到 Network 面板
→ 过滤器输入: "umami" 或 "collect"
```

### 2. 设置测试场景

#### A. RED 状态 + 桌面端
1. 选择 VRAM: 8GB
2. 选择 Model: 32B
3. 预期状态: 🔴 Cannot Run
4. **点击 DeepInfra API 按钮**
5. **验证 Umami 请求 payload:**
   ```json
   {
     "event": "affiliate_click",
     "partner": "deepinfra",
     "status": "red",
     "location": "red_card",
     "model": "32b",
     "vram": "8gb"
   }
   ```

#### B. RED 状态 + 移动端 (mobile_override)
1. 按 F12 → 切换到 Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M)
2. 选择手机模拟 (如 iPhone 14 Pro)
3. 选择 VRAM: 8GB, Model: 32B
4. **点击 DeepInfra API 按钮**
5. **验证 payload:**
   ```json
   {
     "event": "affiliate_click",
     "partner": "deepinfra",
     "status": "red",
     "location": "mobile_override",  // 关键验证点
     "model": "32b",
     "vram": "8gb"
   }
   ```

#### C. YELLOW 状态 + 桌面端
1. 选择 VRAM: 12GB
2. 选择 Model: 32B
3. 预期状态: ⚠️ Performance Warning
4. **点击 Gumroad 按钮**
5. **验证 payload:**
   ```json
   {
     "event": "affiliate_click",
     "partner": "gumroad",
     "status": "yellow",
     "location": "yellow_card",
     "model": "32b",
     "vram": "12gb"
   }
   ```

#### D. YELLOW 状态 + 移动端
1. 切换到手机模拟
2. 选择 VRAM: 12GB, Model: 32B
3. **点击 Gumroad 按钮**
4. **验证 `location: "mobile_override"`**

#### E. GREEN 状态 + 桌面端
1. 选择 VRAM: 24GB
2. 选择 Model: 8B
3. 预期状态: ✅ Ready to Run
4. **点击 Gumroad 大按钮**
5. **验证 payload:**
   ```json
   {
     "event": "affiliate_click",
     "partner": "gumroad",
     "status": "green",
     "location": "green_card",
     "model": "8b",
     "vram": "24gb"
   }
   ```

#### F. GREEN 状态 + 移动端
1. 切换到手机模拟
2. 选择 VRAM: 24GB, Model: 8B
3. **点击 DeepInfra 按钮**
4. **验证 `location: "mobile_override"`**

### 3. Vultr 链接验证 (仅 RED 桌面端)
1. 桌面端，RED 状态
2. **点击 Vultr "Rent High-Memory Cloud GPU" 按钮**
3. **验证 payload:**
   ```json
   {
     "event": "affiliate_click",
     "partner": "vultr",
     "status": "red",
     "location": "red_card",
     "model": "32b",
     "vram": "8gb"
   }
   ```

---

## 验收标准矩阵

| Status | 端 | Location | Partner |
|--------|-----|----------|---------|
| RED | 桌面 | `red_card` | deepinfra/vultr |
| RED | 移动 | `mobile_override` | deepinfra/gumroad |
| YELLOW | 桌面 | `yellow_card` | gumroad/deepinfra |
| YELLOW | 移动 | `mobile_override` | deepinfra/gumroad |
| GREEN | 桌面 | `green_card` | gumroad/deepinfra |
| GREEN | 移动 | `mobile_override` | deepinfra/gumroad |

---

## 关键验证点

✅ **Status 一致性**: status 字段必须与当前计算器状态一致 (red/yellow/green)
✅ **Location 一致性**: 桌面端必须匹配 status (red_card/yellow_card/green_card)
✅ **Mobile Override**: 移动端所有点击必须为 `mobile_override`
✅ **Partner 正确性**: 按钮对应 partner 正确 (Gumroad/DeepInfra/Vultr)
✅ **Model/VRAM**: 必须与当前选择一致
